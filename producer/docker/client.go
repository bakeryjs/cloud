package docker

import (
	"bakery/cloud/producer/utils"
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

func (c *Client) Create(options CreateOptions) (string, error) {
	err := c.pull(options.Image)
	if err != nil {
		return "", err
	}
	config := &container.Config{
		Image:        options.Image,
		Tty:          true,
		OpenStdin:    true,
		ExposedPorts: utils.PortArrayToPortSet(options.Ports),
	}
	hostConfig := &container.HostConfig{
		PortBindings: utils.PortArrayToPortMap(options.Ports),
	}
	networkingConfig := &network.NetworkingConfig{}
	container, err := c.cli.ContainerCreate(
		c.ctx,
		config,
		hostConfig,
		networkingConfig,
		nil,
		options.Name,
	)
	if err != nil {
		return "", err
	}
	err = c.bindToNetwork(container.ID)
	if err != nil {
		fmt.Println(err) // TODO: log it
	}
	c.Start(container.ID)
	err = c.configureSSH(container.ID)
	if err != nil {
		fmt.Println(err) // TODO: log it
	}
	return container.ID, nil
}

func (c *Client) Start(id string) error {
	options := types.ContainerStartOptions{}
	return c.cli.ContainerStart(c.ctx, id, options)
}

func (c *Client) Stop(id string) error {
	options := container.StopOptions{}
	return c.cli.ContainerStop(c.ctx, id, options)
}

func (c *Client) Delete(id string) error {
	options := types.ContainerRemoveOptions{
		RemoveVolumes: true,
		RemoveLinks:   true,
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
	list, err := c.cli.ContainerList(c.ctx, types.ContainerListOptions{})
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

func (c *Client) bindToNetwork(id string) error {
	networkId, err := c.getNetworkId()
	if err != nil {
		return err
	}
	config := network.EndpointSettings{}
	return c.cli.NetworkConnect(c.ctx, networkId, id, &config)
}

func (c *Client) getNetworkId() (string, error) {
	options := types.NetworkListOptions{}
	list, err := c.cli.NetworkList(c.ctx, options)
	if err != nil {
		return "", err
	}
	for _, network := range list {
		if network.Name == COMMON_NETWORK {
			return network.ID, nil
		}
	}
	network, err := c.createNetwork()
	if err != nil {
		return "", nil
	}
	return network.ID, nil
}

func (c *Client) createNetwork() (*types.NetworkCreateResponse, error) {
	options := types.NetworkCreate{}
	network, err := c.cli.NetworkCreate(c.ctx, COMMON_NETWORK, options)
	if err != nil {
		return nil, err
	}
	return &network, err
}

func (c *Client) configureSSH(id string) error {
	options := types.ContainerAttachOptions{
		Stdin:  true,
		Stream: true,
	}
	connection, err := c.cli.ContainerAttach(c.ctx, id, options)
	if err != nil {
		return err
	}
	commands := []string{
		"apt update",
		"apt install -y openssh-server",
		"useradd -rm -d /home/user -s /bin/bash -g root -G sudo -u 1000 user",
		"echo 'user:pass' | chpasswd",
		"service ssh start",
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
