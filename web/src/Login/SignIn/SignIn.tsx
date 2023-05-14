import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SignInModel } from "../types";

interface Props {
  onSubmit: (dataModel: SignInModel) => void;
}

const DefaultDataModel: SignInModel = {
  email: "",
  password: "",
};

export default function SignIn({ onSubmit }: Props) {
  const [dataModel, setDataModel] = useState(DefaultDataModel);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const result = {
      ...dataModel,
      [name as keyof SignInModel]: value,
    };
    setDataModel(result);
  };
  return (
    <Form>
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
      <Button variant="dark" onClick={() => onSubmit(dataModel)}>
        Sign In
      </Button>
    </Form>
  );
}
