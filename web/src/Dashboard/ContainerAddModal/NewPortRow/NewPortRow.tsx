import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  onAdd: (port: string) => void;
}

export default function NewPortRow({ onAdd }: Props) {
  const [container, setContainer] = useState("");
  const [host, setHost] = useState("");
  const handleAddClick = () => {
    onAdd(`${container}:${host}`);
    setContainer("");
    setHost("");
  };
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          placeholder="Container"
          value={container}
          onChange={(e) => setContainer(e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          placeholder="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
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
