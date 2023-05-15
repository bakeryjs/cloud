import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { SignInModel, SignUpModel } from "../models";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { saveToken } = useAuth();
  const navigate = useNavigate();
  const [formType, setFormType] = useState(true);
  const handleFormSwitch = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFormType(!formType);
  };
  const handleSignIn = (model: SignInModel) => {
    // TODO: stub
    saveToken("12345");
    navigate("/dashboard");
  };
  const handleSignUp = (model: SignUpModel) => {
    // TODO: stub
    console.log(model);
  }
  const form = formType ? (
    <SignIn onSubmit={handleSignIn} />
  ) : (
    <SignUp onSubmit={handleSignUp} />
  );
  return (
    <div className="login">
      <Container>
        <Row className="header-section text-center">
          <h1>
            <a className="link-dark" href="/">
              Bakery Cloud
            </a>
          </h1>
        </Row>
        <Row className="form-section">
          <Col className="offset-3 col-6">
            <Card>
              <Card.Body>{form}</Card.Body>
              <Card.Footer className="text-center">
                <span>
                  {formType
                    ? "New to Bakery Cloud?"
                    : "Already have an account?"}{" "}
                  <a
                    className="link-dark"
                    href="/login"
                    onClick={handleFormSwitch}
                  >
                    {formType ? "Sign Up" : "Sign In"}.
                  </a>
                </span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
