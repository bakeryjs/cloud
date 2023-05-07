package docker

type Container struct {
	Id                  string   `json:"id"`
	Image               string   `json:"image"`
	Name                string   `json:"name"`
	Status              string   `json:"status"`
	ChangedAt           string   `json:"changedAt"`
	LocalNetworkGateway string   `json:"localNetworkGateway"`
	LocalNetworkIP      string   `json:"localNetworkIP"`
	Ports               []string `json:"ports"`
}
