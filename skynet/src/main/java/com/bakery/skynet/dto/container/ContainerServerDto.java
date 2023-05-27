package com.bakery.skynet.dto.container;

import com.bakery.skynet.dto.server.ServerDto;
import com.bakery.skynet.model.Container;
import com.bakery.skynet.model.Server;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ContainerServerDto {

    private String id;
    private String image;
    private String status;
    private String changedAt;
    private String localNetworkGateway;
    private String localNetworkIP;
    private List<String> ports;
    private long serverId;
    private String serverName;
    private String serverAddress;
    private String serverLocation;

    public static ContainerServerDto from(
            ContainerDto containerDto,
            ServerDto serverDto) {
        return ContainerServerDto.builder()
                .id(containerDto.getId())
                .image(containerDto.getImage())
                .status(containerDto.getStatus())
                .changedAt(containerDto.getChangedAt())
                .localNetworkGateway(containerDto.getLocalNetworkGateway())
                .localNetworkIP(containerDto.getLocalNetworkIP())
                .ports(containerDto.getPorts())
                .serverId(serverDto.getId())
                .serverName(serverDto.getName())
                .serverAddress(serverDto.getAddress())
                .serverLocation(serverDto.getLocation())
                .build();
    }

}
