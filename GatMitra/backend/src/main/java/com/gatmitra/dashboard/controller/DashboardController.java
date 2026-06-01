package com.gatmitra.dashboard.controller;

import com.gatmitra.dashboard.dto.DashboardStatsDto;
import com.gatmitra.dashboard.service.DashboardService;
import com.gatmitra.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('READ_DASHBOARD')")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStats() {
        DashboardStatsDto stats = dashboardService.getSummaryStats();
        return ResponseEntity.ok(ApiResponse.success("Dashboard statistics loaded successfully", stats));
    }
}
