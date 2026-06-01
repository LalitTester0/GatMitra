package com.gatmitra.audit.service;

import com.gatmitra.audit.entity.ActivityAudit;
import com.gatmitra.audit.entity.LoginAudit;
import com.gatmitra.audit.repository.ActivityAuditRepository;
import com.gatmitra.audit.repository.LoginAuditRepository;
import com.gatmitra.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class AuditService {

    @Autowired
    private LoginAuditRepository loginAuditRepository;

    @Autowired
    private ActivityAuditRepository activityAuditRepository;

    public void logLogin(String username, String ipAddress, String status, String failureReason) {
        LoginAudit audit = LoginAudit.builder()
                .username(username)
                .ipAddress(ipAddress)
                .status(status)
                .loginTime(LocalDateTime.now())
                .failureReason(failureReason)
                .build();
        loginAuditRepository.save(audit);
    }

    public void logActivity(User user, String action, String entityName, String entityId, String details) {
        ActivityAudit audit = ActivityAudit.builder()
                .userId(user != null ? user.getId() : null)
                .username(user != null ? user.getUsername() : "ANONYMOUS")
                .action(action)
                .entityName(entityName)
                .entityId(entityId)
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();
        activityAuditRepository.save(audit);
    }

    public List<LoginAudit> getAllLoginAudits() {
        return loginAuditRepository.findAll();
    }

    public List<ActivityAudit> getAllActivityAudits() {
        return activityAuditRepository.findAll();
    }
}
