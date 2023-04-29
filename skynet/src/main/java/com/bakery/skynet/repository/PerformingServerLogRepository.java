package com.bakery.skynet.repository;

import com.bakery.skynet.model.PerformingServerLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformingServerLogRepository extends JpaRepository<PerformingServerLog, Long> {
}
