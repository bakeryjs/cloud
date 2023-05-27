package com.bakery.skynet.controller;

import com.bakery.skynet.dto.container.ContainerCreateDto;
import com.bakery.skynet.dto.container.ContainerServerDto;
import com.bakery.skynet.service.ContainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@RestController
@RequestMapping("/containers")
@RequiredArgsConstructor
public class ContainerController extends RootController {

    private final ContainerService containerService;

    @GetMapping
    public List<ContainerServerDto> getAllByUser() {
        return containerService.getAllByUser();
    }

    @GetMapping("/{id}")
    public ContainerServerDto getOne(@NotBlank @PathVariable String id) {
        return containerService.getOne(id);
    }

    @PostMapping("/{serverId}")
    public ContainerServerDto create(
            @NotBlank @PathVariable long serverId,
            @Valid @RequestBody ContainerCreateDto dto) {
        return containerService.create(serverId, dto);
    }

    @PostMapping("/{id}/start")
    public void start(@NotBlank @PathVariable String id) {
        containerService.start(id);
    }

    @PostMapping("/{id}/stop")
    public void stop(@NotBlank @PathVariable String id) {
        containerService.stop(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@NotBlank @PathVariable String id) {
        containerService.delete(id);
    }

}
