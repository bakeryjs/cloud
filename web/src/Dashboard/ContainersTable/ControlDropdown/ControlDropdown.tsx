import React, { useState } from "react";
import { Container } from "../../../models";
import { Dropdown } from "react-bootstrap";
import { useFetch } from "../../../http";
import CONFIG from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface Props {
  container: Container;
  onSubmit: () => void;
}

export default function ControlDropdown({ container, onSubmit }: Props) {
  const { request } = useFetch();
  const [show, setShow] = useState(false);
  const showDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setShow(true);
  };
  const hideDropdown = () => {
    setShow(false);
  };
  const start = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    hideDropdown();
    const response = await request(
      `${CONFIG.HOST}/containers/${container?.id}/start`,
      "post"
    );
    if (response.ok) onSubmit();
  };
  const stop = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    hideDropdown();
    const response = await request(
      `${CONFIG.HOST}/containers/${container?.id}/stop`,
      "post"
    );
    if (response.ok) onSubmit();
  };
  const remove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    hideDropdown();
    const response = await request(
      `${CONFIG.HOST}/containers/${container?.id}`,
      "delete"
    );
    if (response.ok) onSubmit();
  };
  const [stateText, stateAction]: any = (() => {
    if (container?.status === "running") return ["Stop", stop];
    if (container?.status === "exited") return ["Start", start];
  })();
  return (
    <Dropdown show={show} className="control-dropdown" onToggle={hideDropdown}>
      <Dropdown.Toggle variant="outline-dark" onClick={showDropdown}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item hidden={!stateText} onClick={stateAction}>
          {stateText}
        </Dropdown.Item>
        <Dropdown.Divider hidden={!stateText} />
        <Dropdown.Item className="text-danger" onClick={remove}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
