package com.bakery.skynet.dto.server;

import com.bakery.skynet.model.Server;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ServerCreateDto {

    @NotBlank(message = "name cannot be empty")
    private String name;

    @NotBlank(message = "address cannot be empty")
    private String address;

    @NotBlank(message = "location cannot be empty")
    private String location;

    public Server toServer() {
        return Server.builder()
                .name(name)
                .address(address)
                .location(location)
                .build();
    }

}
