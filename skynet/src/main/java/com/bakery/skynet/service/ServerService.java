package com.bakery.skynet.service;

import com.bakery.skynet.dto.server.ServerCreateDto;
import com.bakery.skynet.dto.server.ServerDto;
import com.bakery.skynet.dto.server.ServerUpdateDto;

import java.util.List;

public interface ServerService {
    List<ServerDto> getAll();

    ServerDto getOne(long id);

    ServerDto create(ServerCreateDto dto);

    ServerDto update(long id, ServerUpdateDto dto);

    void delete(long id);
}
