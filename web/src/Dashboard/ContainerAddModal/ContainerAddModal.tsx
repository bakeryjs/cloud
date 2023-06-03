import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { ContainerCreateDto, ServerDto } from "../../models";
import NewPortRow from "./NewPortRow/NewPortRow";
import PortRow from "./PortRow";
import { useFetch } from "../../http";
import CONFIG from "../../config";
import { getRandomPort } from "./utils";

interface Props {
  onSubmit: () => void;
}

export default function ContainerAddModal({ onSubmit }: Props) {
  const { request } = useFetch();
  const [show, setShow] = useState(false);
  const [dataModel, setDataModel] = useState({} as ContainerCreateDto);
  const [servers, setServers] = useState([] as ServerDto[]);
  const [server, setServer] = useState("");
  useEffect(() => {
    (async () => {
      const response = await request(`${CONFIG.HOST}/servers`);
      const servers = await response.json();
      setServers(servers);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOpen = () => {
    setShow(true);
    setDataModel({ ports: [`22:${getRandomPort()}`] });
  };
  const handleClose = () => setShow(false);
  const handleSubmit = async () => {
    const response = await request(
      `${CONFIG.HOST}/containers/${server}`,
      "post",
      dataModel
    );
    if (response.ok) {
      onSubmit();
      handleClose();
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const result = {
      ...dataModel,
      [name as keyof ContainerCreateDto]: value,
    };
    setDataModel(result);
  };
  const handlePortAdd = (port: string) => {
    const ports = dataModel.ports || [];
    ports.push(port);
    setDataModel({ ...dataModel, ports });
  };
  const handleRemovePortClick = (port: string) => {
    const ports = dataModel.ports || [];
    const index = ports?.indexOf(port);
    ports.splice(index, 1);
    setDataModel({ ...dataModel, ports });
  };
  return (
    <div className="container-add-modal">
      <Button variant="dark" onClick={handleOpen}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="container-add-modal-form">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image"
                name="image"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Server</Form.Label>
              <Form.Select
                name="server"
                onChange={(e) => setServer(e.target.value)}
              >
                <option>Select server</option>
                {servers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name} / {server.location}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ports</Form.Label>
              <Table borderless>
                <caption>
                  Ports left: {3 - (dataModel.ports?.length || 0)}
                </caption>
                <tbody>
                  {dataModel.ports?.map((port, index) => (
                    <PortRow
                      key={index}
                      port={port}
                      disabled={index === 0}
                      onRemove={handleRemovePortClick}
                    />
                  ))}
                  <NewPortRow
                    hidden={dataModel.ports?.length === 3}
                    onAdd={handlePortAdd}
                  />
                </tbody>
              </Table>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
