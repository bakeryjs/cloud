package docker

import (
	"bakery/cloud/producer/docker/utils"
	"context"
	"fmt"
	"io"
	"strings"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
)

const COMMON_NETWORK = "bakery_producer_network"

type Client struct {
	ctx context.Context
	cli *client.Client
}

func (c *Client) Create(dto ContainerCreateDto) (*Container, error) {
	err := c.pull(dto.Image)
	if err != nil {
		return nil, err
	}
	config := &container.Config{
		Image:        dto.Image,
		Tty:          true,
		OpenStdin:    true,
		ExposedPorts: utils.PortArrayToPortSet(dto.Ports),
	}
	hostConfig := &container.HostConfig{
		PortBindings: utils.PortArrayToPortMap(dto.Ports),
	}
	networkingConfig := &network.NetworkingConfig{}
	container, err := c.cli.ContainerCreate(
		c.ctx,
		config,
		hostConfig,
		networkingConfig,
		nil,
		dto.Name,
	)
	if err != nil {
		return nil, err
	}
	err = c.bindToNetwork(container.ID, dto.Network)
	if err != nil {
		fmt.Println(err) // TODO: log it
	}
	c.cli.ContainerStart(c.ctx, container.ID, types.ContainerStartOptions{})
	err = c.initSystem(container.ID, dto.Username, dto.Password)
	if err != nil {
		fmt.Println(err) // TODO: log it
	}
	return c.ReadOne(container.ID)
}

func (c *Client) Start(id string) error {
	options := types.ContainerStartOptions{}
	err := c.cli.ContainerStart(c.ctx, id, options)
	if err != nil {
		return err
	}
	return c.startSSH(id)
}

func (c *Client) Stop(id string) error {
	options := container.StopOptions{}
	return c.cli.ContainerStop(c.ctx, id, options)
}

func (c *Client) Delete(id string) error {
	options := types.ContainerRemoveOptions{
		RemoveVolumes: true,
		Force:         true,
	}
	return c.cli.ContainerRemove(c.ctx, id, options)
}

func (c *Client) ReadOne(id string) (*Container, error) {
	data, err := c.cli.ContainerInspect(c.ctx, id)
	if err != nil {
		return nil, err
	}
	changedAt := utils.LatestTime([]string{data.Created, data.State.StartedAt, data.State.FinishedAt})
	container := Container{
		Id:                  data.ID,
		Image:               data.Config.Image,
		Name:                data.Name,
		Status:              data.State.Status,
		ChangedAt:           changedAt,
		LocalNetworkGateway: data.NetworkSettings.Gateway,
		LocalNetworkIP:      data.NetworkSettings.IPAddress,
		Ports:               utils.PortMapToPortArray(data.HostConfig.PortBindings),
	}
	return &container, nil
}

func (c *Client) ReadAll() (*[]Container, error) {
	options := types.ContainerListOptions{
		All: true,
	}
	list, err := c.cli.ContainerList(c.ctx, options)
	if err != nil {
		return nil, err
	}
	result := []Container{}
	for _, entry := range list {
		container, err := c.ReadOne(entry.ID)
		if err != nil {
			return nil, err
		}
		result = append(result, *container)
	}
	return &result, nil
}

func (c *Client) pull(image string) error {
	options := types.ImagePullOptions{}
	reader, err := c.cli.ImagePull(c.ctx, image, options)
	if err != nil {
		return err
	}
	buffer := make([]byte, 1024)
	for {
		_, err := reader.Read(buffer)
		if err == io.EOF {
			break
		}
	}
	return nil
}

func (c *Client) bindToNetwork(id string, name string) error {
	networkId, err := c.getNetworkId(name)
	if err != nil {
		return err
	}
	config := network.EndpointSettings{}
	return c.cli.NetworkConnect(c.ctx, networkId, id, &config)
}

func (c *Client) getNetworkId(name string) (string, error) {
	options := types.NetworkListOptions{}
	list, err := c.cli.NetworkList(c.ctx, options)
	if err != nil {
		return "", err
	}
	for _, network := range list {
		if network.Name == name {
			return network.ID, nil
		}
	}
	network, err := c.createNetwork(name)
	if err != nil {
		return "", nil
	}
	return network.ID, nil
}

func (c *Client) createNetwork(name string) (*types.NetworkCreateResponse, error) {
	options := types.NetworkCreate{}
	network, err := c.cli.NetworkCreate(c.ctx, name, options)
	if err != nil {
		return nil, err
	}
	return &network, err
}

func (c *Client) initSystem(id string, username string, password string) error {
	commands := []string{
		"apt update",
		"apt install -y openssh-server sudo",
		"useradd -rm -d /home/" + username + " -s /bin/bash -g root -G sudo -u 1000 " + username,
		"echo '" + username + ":" + password + "' | chpasswd",
		"service ssh start",
	}
	return c.execute(id, commands)
}

func (c *Client) startSSH(id string) error {
	commands := []string{
		"service ssh start",
	}
	return c.execute(id, commands)
}

func (c *Client) execute(id string, commands []string) error {
	options := types.ContainerAttachOptions{
		Stdin:  true,
		Stream: true,
	}
	connection, err := c.cli.ContainerAttach(c.ctx, id, options)
	if err != nil {
		return err
	}
	input := []byte{}
	input = fmt.Append(input, strings.Join(commands, ";"))
	input = fmt.Append(input, "\n")
	_, err = connection.Conn.Write(input)
	if err != nil {
		return err
	}
	connection.Conn.Close()
	return nil
}

func NewClient() *Client {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(
		client.FromEnv,
		client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	return &Client{
		ctx: ctx,
		cli: cli,
	}
}
