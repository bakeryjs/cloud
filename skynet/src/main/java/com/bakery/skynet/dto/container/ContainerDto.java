package com.bakery.skynet.dto.container;

import com.bakery.skynet.model.Container;
import lombok.Data;

import java.util.List;

@Data
public class ContainerDto {

    private String id;
    private String image;
    private String name;
    private String status;
    private String changedAt;
    private String localNetworkGateway;
    private String localNetworkIP;
    private List<String> ports;

    public Container toContainer() {
        return Container.builder()
                .id(id)
                .build();
    }

}
