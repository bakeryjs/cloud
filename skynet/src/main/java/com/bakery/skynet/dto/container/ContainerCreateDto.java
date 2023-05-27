package com.bakery.skynet.dto.container;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class ContainerCreateDto {

    @NotBlank(message = "name cannot be empty")
    private String name;

    @NotBlank(message = "image cannot be empty")
    private String image;

    @NotNull(message = "ports cannot be null")
    private List<String> ports;

}
