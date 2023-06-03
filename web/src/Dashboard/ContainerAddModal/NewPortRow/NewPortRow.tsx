import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getRandomPort } from "../utils";

interface Props {
  hidden?: boolean;
  onAdd: (port: string) => void;
}

export default function NewPortRow({ hidden, onAdd }: Props) {
  const [container, setContainer] = useState("");
  const [host, setHost] = useState(getRandomPort().toString());
  const handleAddClick = () => {
    onAdd(`${container}:${host}`);
    setContainer("");
    setHost(getRandomPort().toString());
  };
  return (
    <tr hidden={hidden}>
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
          disabled={true}
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
