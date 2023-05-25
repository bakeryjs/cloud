package com.bakery.skynet.repository;

import com.bakery.skynet.model.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContainerRepository extends JpaRepository<Container, Long> {
}
