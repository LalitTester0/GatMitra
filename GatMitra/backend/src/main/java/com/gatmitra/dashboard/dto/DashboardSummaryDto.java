package com.gatmitra.dashboard.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardSummaryDto {
    private long totalBachatGats;
    private long totalMembers;
    private long totalUsers;
}
