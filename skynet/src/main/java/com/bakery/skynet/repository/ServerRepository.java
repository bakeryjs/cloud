package com.bakery.skynet.repository;

import com.bakery.skynet.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {
    boolean existsByName(String name);

    boolean existsByAddress(String address);
}
