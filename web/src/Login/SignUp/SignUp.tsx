import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SignUpModel } from "../types";

interface Props {
  onSubmit: (model: SignUpModel) => void;
}

const DefaultModel: SignUpModel = {
  organization: undefined,
  fullName: "",
  email: "",
  password: "",
  country: undefined,
};

export default function SignUp({ onSubmit }: Props) {
  const [businessAccount, setBusinessAccount] = useState(false);
  const [model, setModel] = useState(DefaultModel);
  const handleBusinessAccount = () => {
    setBusinessAccount(!businessAccount);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const result = {
      ...model,
      [name as keyof SignUpModel]: value,
    };
    setModel(result);
  };
  return (
    <Form>
      {businessAccount && (
        <Form.Group>
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Organization"
            name="organization"
            onChange={handleInputChange}
          />
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>
          {!businessAccount ? "Full name" : "Contact person"}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={!businessAccount ? "Full name" : "Contact person"}
          name="fullName"
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
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
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Check
        type="checkbox"
        label="Business account?"
        onChange={handleBusinessAccount}
      />
      <Button variant="dark" onClick={() => onSubmit(model)}>
        Sign Up
      </Button>
    </Form>
  );
}
