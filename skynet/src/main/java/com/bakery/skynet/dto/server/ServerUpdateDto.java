package com.bakery.skynet.dto.server;

import com.bakery.skynet.model.Server;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ServerUpdateDto {

    @NotBlank(message = "name cannot be empty")
    private String name;

    public Server toServer() {
        return Server.builder()
                .name(name)
                .build();
    }

}
