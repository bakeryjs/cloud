import React, { useEffect, useState } from "react";
import { useFetch } from "../../http";
import CONFIG from "../../config";
import { Container } from "../../models";
import { Card, CloseButton, Stack } from "react-bootstrap";

interface Props {
  id?: string;
  onClose: () => void;
}

export default function ContainerInfo({ id, onClose }: Props) {
  const { request } = useFetch();
  const [container, setContainer] = useState({} as Container);
  useEffect(() => {
    if (!id) return;
    (async () => {
      const response = await request(`${CONFIG.HOST}/containers/${id}`);
      const container = await response.json();
      setContainer(container);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Card hidden={!id || !container}>
      <Card.Header>
        <span>{container.name}</span>
        <CloseButton className="float-end" onClick={onClose} />
      </Card.Header>
      <Card.Body>
        <Stack direction="horizontal">
          <Stack gap={4}>
            <Stack>
              <span className="text-muted">ID</span>
              <span>{container.id?.substring(0, 12)}</span>
            </Stack>
            <Stack>
              <span className="text-muted">Server address</span>
              <span>{container.serverAddress}</span>
            </Stack>
          </Stack>
          <Stack gap={4}>
            <Stack>
              <span className="text-muted">Image</span>
              <span>{container.image}</span>
            </Stack>
            <Stack>
              <span className="text-muted">Server location</span>
              <span>{container.serverLocation}</span>
            </Stack>
          </Stack>
          <Stack gap={4}>
            <Stack>
              <span className="text-muted">Status</span>
              <span>{container.status?.toUpperCase()}</span>
            </Stack>
            <Stack>
              <span className="text-muted">Local Network Gateway</span>
              <span>{container.localNetworkGateway}</span>
            </Stack>
          </Stack>
          <Stack gap={4}>
            <Stack>
              <span className="text-muted">Changed At</span>
              <span>{new Date(container.changedAt!).toLocaleString("US")}</span>
            </Stack>
            <Stack>
              <span className="text-muted">Local Network IP</span>
              <span>{container.localNetworkIP}</span>
            </Stack>
          </Stack>
          <Stack gap={4}>
            <Stack>
              <span className="text-muted">Server name</span>
              <span>{container.serverName}</span>
            </Stack>
            <Stack>
              <span className="text-muted">Ports</span>
              <span>{container.ports?.join(", ")}</span>
            </Stack>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
