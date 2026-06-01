package com.gatmitra.audit.repository;

import com.gatmitra.audit.entity.ActivityAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ActivityAuditRepository extends JpaRepository<ActivityAudit, UUID> {
}
