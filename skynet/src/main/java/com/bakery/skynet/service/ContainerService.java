package com.bakery.skynet.service;

import com.bakery.skynet.dto.container.ContainerCreateDto;
import com.bakery.skynet.dto.container.ContainerDto;
import com.bakery.skynet.dto.container.ContainerServerDto;

import java.util.List;

public interface ContainerService {
    List<ContainerServerDto> getAllByUser();

    List<ContainerDto> getAllByServer(long serverId);

    ContainerServerDto getOne(String id);

    ContainerServerDto create(long serverId, ContainerCreateDto dto);

    void start(String id);

    void stop(String id);

    void delete(String id);
}
