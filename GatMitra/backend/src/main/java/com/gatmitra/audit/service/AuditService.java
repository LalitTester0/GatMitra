package com.gatmitra.audit.service;

import com.gatmitra.audit.entity.ActivityAudit;
import com.gatmitra.audit.entity.LoginAudit;
import com.gatmitra.audit.repository.ActivityAuditRepository;
import com.gatmitra.audit.repository.LoginAuditRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditService {

    private final LoginAuditRepository loginAuditRepository;
    private final ActivityAuditRepository activityAuditRepository;

    public void logLogin(UUID userId, String status) {
        String ipAddress = getClientIpAddress();
        
        LoginAudit audit = LoginAudit.builder()
                .userId(userId)
                .loginTime(LocalDateTime.now())
                .ipAddress(ipAddress)
                .deviceDetails(getUserAgent())
                .loginStatus(status)
                .build();
                
        loginAuditRepository.save(audit);
        log.info("Login audit saved for userId: {}, status: {}", userId, status);
    }

    public void logActivity(UUID userId, String moduleName, String activityType, String previousValue, String newValue) {
        String ipAddress = getClientIpAddress();
        
        ActivityAudit audit = ActivityAudit.builder()
                .userId(userId)
                .moduleName(moduleName)
                .activityType(activityType)
                .previousValue(previousValue)
                .newValue(newValue)
                .ipAddress(ipAddress)
                .createdAt(LocalDateTime.now())
                .build();
                
        activityAuditRepository.save(audit);
        log.debug("Activity logged: {} on module {} by userId {}", activityType, moduleName, userId);
    }

    private String getClientIpAddress() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String xfHeader = request.getHeader("X-Forwarded-For");
            if (xfHeader == null) {
                return request.getRemoteAddr();
            }
            return xfHeader.split(",")[0];
        }
        return "UNKNOWN";
    }

    private String getUserAgent() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            return attributes.getRequest().getHeader("User-Agent");
        }
        return "UNKNOWN";
    }
}
