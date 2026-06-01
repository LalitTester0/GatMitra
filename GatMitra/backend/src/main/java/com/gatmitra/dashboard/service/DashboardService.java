package com.gatmitra.dashboard.service;

import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.dashboard.dto.DashboardStatsDto;
import com.gatmitra.member.repository.MemberRepository;
import com.gatmitra.user.repository.UserRepository;
import com.gatmitra.audit.repository.LoginAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    @Autowired
    private BachatGatRepository bachatGatRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginAuditRepository loginAuditRepository;

    public DashboardStatsDto getSummaryStats() {
        long totalGroups = bachatGatRepository.count();
        long totalMembers = memberRepository.count();
        long totalUsers = userRepository.count();

        // Calculate expected monthly savings sum
        BigDecimal totalExpectedSavings = bachatGatRepository.findAll().stream()
                .map(BachatGat::getMonthlySavingsAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Fetch audit ratios
        long successfulLogins = loginAuditRepository.findAll().stream()
                .filter(a -> "SUCCESS".equalsIgnoreCase(a.getStatus()) || "SUCCESS_OTP".equalsIgnoreCase(a.getStatus()))
                .count();
        long failedLogins = loginAuditRepository.count() - successfulLogins;

        return DashboardStatsDto.builder()
                .totalGroups(totalGroups)
                .totalMembers(totalMembers)
                .totalSystemUsers(totalUsers)
                .totalExpectedMonthlySavings(totalExpectedSavings)
                .pendingNotifications(2) // Mock notifications indicator
                .successfulLoginsCount(successfulLogins)
                .failedLoginsCount(failedLogins)
                .build();
    }
}
