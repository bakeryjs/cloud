package com.bakery.skynet.repository;

import com.bakery.skynet.model.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ContainerRepository extends JpaRepository<Container, Long> {
    List<Container> findAllByUserUuid(UUID uuid);

    Optional<Container> findOneByIdAndUserUuid(String id, UUID userId);
}
