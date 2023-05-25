package com.bakery.skynet.service.impl;

import com.bakery.skynet.dto.server.ServerCreateDto;
import com.bakery.skynet.dto.server.ServerDto;
import com.bakery.skynet.dto.server.ServerUpdateDto;
import com.bakery.skynet.model.Server;
import com.bakery.skynet.model.State;
import com.bakery.skynet.repository.ServerRepository;
import com.bakery.skynet.service.ServerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;

    private Server findOne(long id) {
        return serverRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("server with id " + id + " not found"));
    }

    @Override
    public List<ServerDto> getAll() {
        return serverRepository.findAll().stream()
                .map(ServerDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public ServerDto getOne(long id) {
        return ServerDto.from(findOne(id));
    }

    @Override
    public ServerDto create(ServerCreateDto dto) {
        if (serverRepository.existsByName(dto.getName())
                || serverRepository.existsByAddress(dto.getAddress())) {
            throw new EntityExistsException("server with name " + dto.getName() + " or address " + dto.getAddress() + " already exists");
        }
        Server server = dto.toServer();
        server.setState(State.UP); // TODO: set this after making health-check
        server.setChangedAt(Timestamp.from(Instant.now()));
        Server serverDb = serverRepository.save(server);
        return ServerDto.from(serverDb);
    }

    @Override
    public ServerDto update(long id, ServerUpdateDto dto) {
        Server server = findOne(id);
        server.setName(dto.getName());
        Server serverDb = serverRepository.save(server);
        return ServerDto.from(serverDb);
    }

    @Override
    public void delete(long id) {
        serverRepository.delete(findOne(id));
    }

}
