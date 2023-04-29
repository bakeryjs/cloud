package com.bakery.skynet.repository;

import com.bakery.skynet.model.ApplicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationLogRepository extends JpaRepository<ApplicationLog, Long> {
}
