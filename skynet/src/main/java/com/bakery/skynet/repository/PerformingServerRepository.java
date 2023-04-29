package com.bakery.skynet.repository;

import com.bakery.skynet.model.PerformingServer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformingServerRepository extends JpaRepository<PerformingServer, Long> {
}
