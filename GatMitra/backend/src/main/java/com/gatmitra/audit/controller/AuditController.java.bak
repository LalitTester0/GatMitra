package com.gatmitra.audit.controller;

import com.gatmitra.audit.entity.ActivityAudit;
import com.gatmitra.audit.entity.LoginAudit;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/audit")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @GetMapping("/login")
    @PreAuthorize("hasAuthority('READ_AUDIT')")
    public ResponseEntity<ApiResponse<List<LoginAudit>>> getLoginAudits() {
        List<LoginAudit> audits = auditService.getAllLoginAudits();
        return ResponseEntity.ok(ApiResponse.success("Login audit logs retrieved successfully", audits));
    }

    @GetMapping("/activity")
    @PreAuthorize("hasAuthority('READ_AUDIT')")
    public ResponseEntity<ApiResponse<List<ActivityAudit>>> getActivityAudits() {
        List<ActivityAudit> audits = auditService.getAllActivityAudits();
        return ResponseEntity.ok(ApiResponse.success("Activity audit logs retrieved successfully", audits));
    }
}
