import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  port: string;
  onRemove: (port: string) => void;
}

export default function PortRow({ port, onRemove }: Props) {
  const [container, host] = port.split(":");
  const handleRemoveClick = () => onRemove(port);
  return (
    <tr>
      <td>
        <Form.Control value={container} disabled={true} />
      </td>
      <td>
        <Form.Control value={host} disabled={true} />
      </td>
      <td>
        <Button variant="outline-dark" onClick={handleRemoveClick}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
}
