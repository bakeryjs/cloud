package http

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type HTTPServer struct {
	Config      HTTPServerConfig
	Router      *mux.Router
	Controllers *[]HTTPController
	Server      *http.Server
}

func (hs *HTTPServer) Up() {
	for _, controller := range *hs.Controllers {
		controller.HandleRoutes(hs.Router)
	}
	log.Printf("starting http server on %s", hs.Config.Address)
	hs.Server = &http.Server{
		Addr:    hs.Config.Address,
		Handler: hs.Router,
	}
	err := hs.Server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Println("http server down")
		log.Fatalln(err)
	}
}

func (hs *HTTPServer) Down() {
	if hs.Server == nil {
		log.Println("cannot stop http server, is was not started")
	}
	log.Println("gracefully shuting down the http server")
	err := hs.Server.Shutdown(context.Background())
	if err != nil {
		log.Println("http server gracefull shutdown failed")
		log.Fatalln(err)
	}
}
