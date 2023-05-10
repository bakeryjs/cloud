//go:build wireinject

package main

import (
	"bakery/cloud/producer/docker"
	"bakery/cloud/producer/http"
	"bakery/cloud/producer/http/containers"

	"github.com/google/wire"
	"github.com/gorilla/mux"
)

type Application struct {
	HTTPServer *http.HTTPServer
}

func composeHTTPControllers(
	containersController *containers.ContainersController,
) *[]http.HTTPController {
	return &[]http.HTTPController{
		containersController,
	}
}

func Init(
	httpServerConfig http.HTTPServerConfig,
) (*Application, error) {
	panic(wire.Build(
		mux.NewRouter,
		composeHTTPControllers,
		docker.NewClient,
		containers.NewContainersController,
		wire.Struct(new(http.HTTPServer), "config", "router", "controllers"),
		wire.Struct(new(Application), "HTTPServer"),
	))
}
