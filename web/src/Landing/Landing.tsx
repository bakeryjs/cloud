import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";

export default function Landing() {
  return (
    <div className="landing">
      <Navbar>
        <Container>
          <Navbar.Brand href="#">Bakery Cloud</Navbar.Brand>
          <Navbar.Text className="sign-controls">
            <a href="/login">Sign In</a>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container className="promotion-message">
        <Row>
          <Col className="text-center">
            <h2>The cloud has never been so accessible</h2>
            <span className="text-muted">
              Try it yourself{" "}
              <a className="link-dark" href="/dashboard">
                now
              </a>
              .
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
