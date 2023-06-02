package docker

type ContainerCreateDto struct {
	Image    string   `json:"image"`
	Name     string   `json:"name"`
	Network  string   `json:"network"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	Ports    []string `json:"ports"`
}
