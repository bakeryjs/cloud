package containers

import (
	"bakery/cloud/producer/docker"
	"bakery/cloud/producer/fail"
	httpUtils "bakery/cloud/producer/http/utils"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type ContainersController struct {
	dockerClient *docker.Client
}

func (cc *ContainersController) HandleRoutes(router *mux.Router) {
	router.HandleFunc("/containers/info", cc.InfoAll).Methods("GET")
	router.HandleFunc("/containers/{containerId}/info", cc.Info).Methods("GET")
	router.HandleFunc("/containers/create", cc.Create).Methods("POST")
	router.HandleFunc("/containers/{containerId}/start", cc.Start).Methods("POST")
	router.HandleFunc("/containers/{containerId}/stop", cc.Stop).Methods("POST")
	router.HandleFunc("/containers/{containerId}/delete", cc.Stop).Methods("DELETE")
}

func (cc *ContainersController) InfoAll(w http.ResponseWriter, r *http.Request) {
	result, err := cc.dockerClient.ReadAll()
	if err != nil {
		log.Println(err)
		httpUtils.Respond(w, http.StatusBadRequest, []string{})
	}
	httpUtils.Respond(w, http.StatusOK, result)
}

func (cc *ContainersController) Info(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	containerId := vars["containerId"]
	result, err := cc.dockerClient.ReadOne(containerId)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadRequest, err)
		return
	}
	httpUtils.Respond(w, http.StatusOK, result)
}

func (cc *ContainersController) Create(w http.ResponseWriter, r *http.Request) {
	var options docker.CreateOptions
	err := json.NewDecoder(r.Body).Decode(&options)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadRequest, fail.InvalidRequestBody)
	}
	result, err := cc.dockerClient.Create(options)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadGateway, err)
	}
	httpUtils.Respond(w, http.StatusOK, result)
}

func (cc *ContainersController) Start(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	containerId := vars["containerId"]
	err := cc.dockerClient.Start(containerId)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadRequest, err)
		return
	}
	httpUtils.Respond(w, http.StatusOK, true)
}

func (cc *ContainersController) Stop(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	containerId := vars["containerId"]
	err := cc.dockerClient.Stop(containerId)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadRequest, err)
		return
	}
	httpUtils.Respond(w, http.StatusOK, true)
}

func (cc *ContainersController) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	containerId := vars["containerId"]
	err := cc.dockerClient.Delete(containerId)
	if err != nil {
		httpUtils.Respond(w, http.StatusBadGateway, err)
		return
	}
	httpUtils.Respond(w, http.StatusOK, true)
}

func NewContainersController(dockerClient *docker.Client) *ContainersController {
	return &ContainersController{dockerClient: dockerClient}
}
