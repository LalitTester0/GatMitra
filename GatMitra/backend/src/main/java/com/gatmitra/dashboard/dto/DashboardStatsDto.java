package com.gatmitra.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalGroups;
    private long totalMembers;
    private long totalSystemUsers;
    private BigDecimal totalExpectedMonthlySavings;
    private long pendingNotifications;
    private long successfulLoginsCount;
    private long failedLoginsCount;
}
