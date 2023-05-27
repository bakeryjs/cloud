package docker

type ContainerCreateDto struct {
	Image string   `json:"image"`
	Name  string   `json:"name"`
	Ports []string `json:"ports"`
}
