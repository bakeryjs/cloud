package main

import (
	"bakery/cloud/producer/http"
	"log"
	"os"
	"os/signal"
)

var httpServerConfig = http.HTTPServerConfig{
	Address: ":9092",
}

func main() {
	application, err := Init(httpServerConfig)
	if err != nil {
		log.Println("cannot initialize application")
		log.Fatalln(err)
	}
	go application.HTTPServer.Up()
	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt)
	<-shutdown
	log.Println("interrupting...")
	application.HTTPServer.Down()
}
