import React, { useEffect, useState } from "react";
import { Container } from "../../models";
import CONFIG from "../../config";
import { Table } from "react-bootstrap";
import { useFetch } from "../../http";
import ControlDropdown from "./ControlDropdown";

interface Props {
  updateTrigger: number;
  onSelect: (id: string) => void;
}

export default function ContainersTable({ updateTrigger, onSelect }: Props) {
  const { request } = useFetch();
  const [containers, setContainers] = useState([] as Container[]);
  useEffect(() => {
    (async () => {
      const response = await request(`${CONFIG.HOST}/containers`);
      const containers = await response.json();
      setContainers(containers);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTrigger]);
  return (
    <Table className="containers-table" hover={true} striped={true}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Identifier</th>
          <th>Server</th>
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {containers.map((container) => (
          <tr
            className="align-middle"
            key={container.id}
            onClick={() => onSelect(container.id!)}
          >
            <td>{container.name}</td>
            <td>{container.id?.substring(0, 12)}</td>
            <td>{container.serverName}</td>
            <td>{container.status?.toUpperCase()}</td>
            <td>
              <ControlDropdown container={container} onSubmit={() => {}} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
