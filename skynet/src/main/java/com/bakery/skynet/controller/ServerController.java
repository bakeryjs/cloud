package com.bakery.skynet.controller;

import com.bakery.skynet.dto.server.ServerCreateDto;
import com.bakery.skynet.dto.server.ServerDto;
import com.bakery.skynet.dto.server.ServerUpdateDto;
import com.bakery.skynet.service.ServerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@RestController
@RequestMapping("/servers")
@RequiredArgsConstructor
public class ServerController extends RootController {

    private final ServerService serverService;

    @GetMapping
    public List<ServerDto> getAll() {
        return serverService.getAll();
    }

    @GetMapping("/{id}")
    public ServerDto getOne(@NotBlank @PathVariable long id) {
        return serverService.getOne(id);
    }

    @PostMapping
    public ServerDto create(@Valid @RequestBody ServerCreateDto dto) {
        return serverService.create(dto);
    }

    @PutMapping("/{id}")
    public ServerDto update(
            @NotBlank @PathVariable long id,
            @Valid @RequestBody ServerUpdateDto dto) {
        return serverService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@NotBlank @PathVariable long id) {
        serverService.delete(id);
    }

}
