package com.gatmitra.audit.repository;

import com.gatmitra.audit.entity.LoginAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LoginAuditRepository extends JpaRepository<LoginAudit, UUID> {
}
