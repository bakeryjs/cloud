package utils

import (
	"fmt"
	"strings"
	"time"

	"github.com/docker/go-connections/nat"
)

func LatestTime(dates []string) string {
	result := time.Date(1970, 1, 1, 0, 0, 0, 0, time.UTC).UnixMilli()
	for _, value := range dates {
		entry, err := time.Parse(time.RFC3339, value)
		if err != nil {
			panic(err)
		}
		milli := entry.UnixMilli()
		if milli > result {
			result = milli
		}
	}
	return time.UnixMilli(result).Format(time.RFC3339)
}

func PortMapToPortArray(portMap nat.PortMap) []string {
	result := []string{}
	for key, entry := range portMap {
		result = append(result, fmt.Sprintf("%s:%s", key, entry[0].HostPort))
	}
	return result
}

func PortArrayToPortMap(portArray []string) nat.PortMap {
	result := nat.PortMap{}
	for _, entry := range portArray {
		args := strings.Split(entry, ":")
		result[nat.Port(args[0])] = []nat.PortBinding{
			{
				HostPort: args[1],
			},
		}
	}
	return result
}

func PortArrayToPortSet(portArray []string) nat.PortSet {
	result := nat.PortSet{}
	for _, entry := range portArray {
		port := strings.Split(entry, ":")[0]
		result[nat.Port(port)] = struct{}{}
	}
	return result
}
