package docker

type CreateOptions struct {
	Image string
	Name  string
	Ports []string
}
