import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  hidden?: boolean;
  onAdd: (port: string) => void;
}

export default function NewPortRow({ hidden, onAdd }: Props) {
  const [port, setPort] = useState("");
  const handleAddClick = () => {
    onAdd(port);
    setPort("");
  };
  return (
    <tr hidden={hidden}>
      <td>
        <Form.Control
          type="text"
          placeholder="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </td>
      <td>
        <Button variant="outline-dark" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </td>
    </tr>
  );
}
