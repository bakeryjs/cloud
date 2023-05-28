import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../auth";
import ContainersTable from "./ContainersTable";
import UserNavbar from "./UserNavbar";
import ContainerAddModal from "./ContainerAddModal/ContainerAddModal";
import ContainerInfo from "./ContainerInfo";

export default function Dashboard() {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const onAdd = () => setUpdateTrigger(updateTrigger + 1);
  useAuth(true);
  return (
    <div className="dashboard">
      <UserNavbar />
      <Container className="table-container">
        <Row>
          <Col>
            <h3>Containers</h3>
          </Col>
          <Col className="text-end">
            <ContainerAddModal onSubmit={onAdd} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ContainersTable
              updateTrigger={updateTrigger}
              onSelect={setSelectedId}
            />
          </Col>
        </Row>
        <Row className="info-row">
          <Col>
            <ContainerInfo id={selectedId} onClose={() => setSelectedId("")} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
