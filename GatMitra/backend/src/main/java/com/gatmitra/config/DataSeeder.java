package com.gatmitra.config;

import com.gatmitra.role.entity.Role;
import com.gatmitra.role.repository.RoleRepository;
import com.gatmitra.user.entity.User;
import com.gatmitra.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Running Data Seeder...");

        // Seed Super Admin Role
        Role superAdminRole = roleRepository.findByRoleCode("SUPERADMIN").orElseGet(() -> {
            log.info("Creating SUPERADMIN role...");
            Role role = Role.builder()
                    .roleCode("SUPERADMIN")
                    .roleName("Super Administrator")
                    .description("System Super Administrator with all permissions")
                    .isActive(true)
                    .build();
            return roleRepository.save(role);
        });

        // Seed Super Admin User
        String superAdminMobile = "9999999999";
        if (userRepository.findByMobileNumber(superAdminMobile).isEmpty()) {
            log.info("Creating default Super Admin user...");
            User superAdmin = User.builder()
                    .mobileNumber(superAdminMobile)
                    .fullName("System Superadmin")
                    .role(superAdminRole)
                    .status("ACTIVE")
                    .preferredLanguage("en")
                    .whatsappEnabled(true)
                    .build();
            userRepository.save(superAdmin);
            log.info("Super Admin user created successfully with mobile number: {}", superAdminMobile);
        } else {
            log.info("Super Admin user already exists.");
        }
    }
}
