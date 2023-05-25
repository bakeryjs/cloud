import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  NavDropdown,
  Navbar,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { useAuth } from "../auth";
import { User } from "../models";
import CONFIG from "../config";

const DefaultUser: User = {};

export default function Dashboard() {
  const { getToken, resetToken } = useAuth(true);
  const [user, setUser] = useState(DefaultUser);
  const logout = () => resetToken();
  useEffect(() => {
    (async () => {
      const response = await fetch(`${CONFIG.HOST}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const user = await response.json();
      setUser(user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard">
      <Navbar>
        <Container>
          <Navbar.Brand href="#">Bakery Cloud</Navbar.Brand>
          <NavDropdown
            className="dropdown-menu-left"
            title={user.organization || user.fullName}
          >
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <Container className="table-container">
        <Row>
          <Col>
            <h3>Containers</h3>
          </Col>
          <Col className="text-end">
            <Button variant="dark">Create</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hover={true} striped={true}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Identifier</th>
                  <th>Server</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>My Server</td>
                  <td>4gylo1qfe83</td>
                  <td>BC-US</td>
                  <td>Stopped</td>
                </tr>
                <tr>
                  <td>My Server</td>
                  <td>4gylo1qfe83</td>
                  <td>BC-US</td>
                  <td>Stopped</td>
                </tr>
                <tr>
                  <td>My Server</td>
                  <td>4gylo1qfe83</td>
                  <td>BC-US</td>
                  <td>Stopped</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="info-row">
          <Col>
            <Card>
              <Card.Header>
                <span>My Server</span>
                <CloseButton className="float-end" />
              </Card.Header>
              <Card.Body>
                <Stack direction="horizontal">
                  <Stack gap={4}>
                    <Stack>
                      <span className="text-muted">Identifier</span>
                      <span>4gylo1qfe83</span>
                    </Stack>
                    <Stack>
                      <span>Network address</span>
                      <span>98.243.190.201</span>
                    </Stack>
                  </Stack>
                  <Stack gap={4}>
                    <Stack>
                      <span className="text-muted">Local name</span>
                      <span>my-server</span>
                    </Stack>
                    <Stack>
                      <span className="text-muted">Local Gateway</span>
                      <span>172.17.0.1</span>
                    </Stack>
                  </Stack>
                  <Stack gap={4}>
                    <Stack>
                      <span className="text-muted">Image</span>
                      <span>ubuntu</span>
                    </Stack>
                    <Stack>
                      <span className="text-muted">Local Address</span>
                      <span>172.17.0.1</span>
                    </Stack>
                  </Stack>
                  <Stack gap={4}>
                    <Stack>
                      <span className="text-muted">State</span>
                      <span>Stopped</span>
                    </Stack>
                    <Stack>
                      <span className="text-muted">Port range</span>
                      <span>8000-8010</span>
                    </Stack>
                  </Stack>
                  <Stack gap={4}>
                    <Stack>
                      <span className="text-muted">Changed at</span>
                      <span>2023-05-10T19:35:52</span>
                    </Stack>
                    <Stack>
                      <span className="text-muted">Ports</span>
                      <span>8000:20</span>
                    </Stack>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
