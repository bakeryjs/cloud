package com.bakery.skynet.service.impl;

import com.bakery.skynet.dto.container.ContainerCreateDto;
import com.bakery.skynet.dto.container.ContainerDto;
import com.bakery.skynet.dto.container.ContainerServerDto;
import com.bakery.skynet.dto.server.ServerDto;
import com.bakery.skynet.exception.UnablePerformOperation;
import com.bakery.skynet.model.Container;
import com.bakery.skynet.model.User;
import com.bakery.skynet.repository.ContainerRepository;
import com.bakery.skynet.service.ContainerService;
import com.bakery.skynet.service.ServerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContainerServiceImpl implements ContainerService {

    private static final String PRODUCER_PORT = "9092";

    private final ServerService serverService;
    private final ContainerRepository containerRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    private Container findOne(String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return containerRepository.findOneByIdAndUserUuid(id, user.getUuid())
                .orElseThrow(() -> new EntityNotFoundException("container with id " + id + " doesn't exists or doesn't belongs to the user"));
    }

    @Override
    public List<ContainerServerDto> getAllByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<ContainerServerDto> result = new ArrayList<>();
        List<Container> containers = containerRepository.findAllByUserUuid(user.getUuid());
        for (Container entry : containers) {
            ContainerServerDto containerDto = getOne(entry.getId());
            if (containerDto != null) {
                result.add(containerDto);
            }
        }
        return result;
    }

    @Override
    public List<ContainerDto> getAllByServer(long serverId) {
        return null;
    }

    @Override
    public ContainerServerDto getOne(String id) {
        Container container = findOne(id);
        String url = String.format(
                "http://%s:%s/containers/%s",
                container.getServer().getAddress(),
                PRODUCER_PORT,
                container.getId());
        ContainerDto containerDto = restTemplate.getForObject(url, ContainerDto.class);
        if (containerDto == null) {
            log.warn("container with id " + id + " not found on its server, removing it from database");
            containerRepository.delete(container);
            return null;
        }
        return ContainerServerDto.from(containerDto, ServerDto.from(container.getServer()));
    }

    @Override
    public ContainerServerDto create(long serverId, ContainerCreateDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        ServerDto serverDto = serverService.getOne(serverId);
        dto.setNetwork(user.getUuid().toString().substring(0, 8));
        HttpEntity<ContainerCreateDto> entity = new HttpEntity<>(dto);
        String url = String.format(
                "http://%s:%s/containers",
                serverDto.getAddress(),
                PRODUCER_PORT);
        ContainerDto containerDto = restTemplate.postForObject(url, entity, ContainerDto.class);
        if (containerDto == null) {
            throw new UnablePerformOperation("unable to create a new container with provided options or the server is not responding");
        }
        Container container = containerDto.toContainer();
        container.setServer(serverDto.toServer());
        container.setUser(user);
        containerRepository.save(container);
        return ContainerServerDto.from(containerDto, serverDto);
    }

    @Override
    public void start(String id) {
        Container container = findOne(id);
        String url = String.format(
                "http://%s:%s/containers/%s/start",
                container.getServer().getAddress(),
                PRODUCER_PORT,
                container.getId());
        restTemplate.postForObject(url, null, Void.class);
    }

    @Override
    public void stop(String id) {
        Container container = findOne(id);
        String url = String.format(
                "http://%s:%s/containers/%s/stop",
                container.getServer().getAddress(),
                PRODUCER_PORT,
                container.getId());
        restTemplate.postForObject(url, null, Void.class);
    }

    @Override
    public void delete(String id) {
        Container container = findOne(id);
        containerRepository.delete(container);
        String url = String.format(
                "http://%s:%s/containers/%s",
                container.getServer().getAddress(),
                PRODUCER_PORT,
                container.getId());
        restTemplate.delete(url);
    }

}
