package com.gatmitra.audit.aspect;

import com.gatmitra.audit.annotation.LogActivity;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class AuditAspect {

    private final AuditService auditService;

    @Around("@annotation(com.gatmitra.audit.annotation.LogActivity)")
    public Object logActivity(ProceedingJoinPoint joinPoint) throws Throwable {
        
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        LogActivity logActivityAnnotation = signature.getMethod().getAnnotation(LogActivity.class);
        
        String moduleName = logActivityAnnotation.moduleName();
        String activityType = logActivityAnnotation.activityType();

        // Capture previous state (hard to do generically without knowing the entity, so we just capture method arguments)
        // A more advanced implementation would fetch the entity before proceed() if it's an UPDATE
        String previousValue = "Method Arguments: " + java.util.Arrays.toString(joinPoint.getArgs());

        Object result;
        try {
            result = joinPoint.proceed();
        } catch (Throwable e) {
            log.error("Error executing {}: {}", signature.getName(), e.getMessage());
            throw e;
        }

        String newValue = result != null ? result.toString() : "Success";

        UUID userId = getCurrentUserId();
        if (userId != null) {
            auditService.logActivity(userId, moduleName, activityType, previousValue, newValue);
        } else {
            log.warn("Could not log activity for {} {} - No authenticated user found", moduleName, activityType);
        }

        return result;
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return userDetails.getUser().getId();
        }
        return null;
    }
}
