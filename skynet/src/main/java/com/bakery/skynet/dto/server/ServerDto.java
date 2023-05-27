package com.bakery.skynet.dto.server;

import com.bakery.skynet.model.Server;
import com.bakery.skynet.model.State;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class ServerDto {

    private long id;
    private String name;
    private String address;
    private String location;
    private State state;
    private Timestamp changedAt;

    public static ServerDto from(Server server) {
        return ServerDto.builder()
                .id(server.getId())
                .name(server.getName())
                .address(server.getAddress())
                .location(server.getLocation())
                .state(server.getState())
                .changedAt(server.getChangedAt())
                .build();
    }

    public Server toServer() {
        return Server.builder()
                .id(id)
                .name(name)
                .address(address)
                .location(location)
                .state(state)
                .changedAt(changedAt)
                .build();
    }

}
