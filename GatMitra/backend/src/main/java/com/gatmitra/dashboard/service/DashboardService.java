package com.gatmitra.dashboard.service;

import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.dashboard.dto.DashboardStatsDto;
import com.gatmitra.member.repository.MemberRepository;
import com.gatmitra.user.repository.UserRepository;
import com.gatmitra.audit.repository.LoginAuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {

    private final BachatGatRepository bachatGatRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final LoginAuditRepository loginAuditRepository;

    public DashboardStatsDto getSummaryStats() {
        long totalGroups = bachatGatRepository.count();
        long totalMembers = memberRepository.count();
        long totalUsers = userRepository.count();

        // Calculate expected monthly savings sum
        BigDecimal totalExpectedSavings = bachatGatRepository.findAll().stream()
                .map(BachatGat::getMonthlyContribution)
                .reduce(BigDecimal.ZERO, (a, b) -> {
                    if (a == null && b == null) return BigDecimal.ZERO;
                    if (a == null) return b;
                    if (b == null) return a;
                    return a.add(b);
                });

        if (totalExpectedSavings == null) {
            totalExpectedSavings = BigDecimal.ZERO;
        }

        // Fetch audit ratios
        long successfulLogins = loginAuditRepository.findAll().stream()
                .filter(a -> "SUCCESS".equalsIgnoreCase(a.getLoginStatus()) || "SUCCESS_OTP".equalsIgnoreCase(a.getLoginStatus()))
                .count();
        long failedLogins = loginAuditRepository.count() - successfulLogins;

        return DashboardStatsDto.builder()
                .totalGroups(totalGroups)
                .totalMembers(totalMembers)
                .totalSystemUsers(totalUsers)
                .totalExpectedMonthlySavings(totalExpectedSavings)
                .pendingNotifications(0)
                .successfulLoginsCount(successfulLogins)
                .failedLoginsCount(failedLogins)
                .build();
    }
}
