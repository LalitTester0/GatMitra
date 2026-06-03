package com.gatmitra.auth.service;

import com.gatmitra.auth.dto.LoginRequest;
import com.gatmitra.auth.dto.LoginResponse;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.exception.BadRequestException;
import com.gatmitra.security.CustomUserDetails;
import com.gatmitra.security.JwtUtil;
import com.gatmitra.user.entity.User;
import com.gatmitra.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    @Autowired
    private AuditService auditService;

    public LoginResponse login(LoginRequest request, String ipAddress) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            String token = jwtUtil.generateToken(userDetails);
            
            // Log successful login
            auditService.logLogin(user.getUsername(), ipAddress, "SUCCESS", null);

            return LoginResponse.builder()
                    .token(token)
                    .refreshToken("refresh-token-placeholder") // Standard placeholder
                    .user(LoginResponse.UserDetailsDto.builder()
                            .id(user.getId())
                            .username(user.getUsername())
                            .phoneNumber(user.getPhoneNumber())
                            .roles(user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toList()))
                            .build())
                    .build();
        } catch (Exception e) {
            // Log failed login
            auditService.logLogin(request.getUsername(), ipAddress, "FAILURE", e.getMessage());
            throw e;
        }
    }

    public void requestOtp(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new BadRequestException("No user is registered with this phone number."));

        if (!user.isActive()) {
            throw new BadRequestException("User account is inactive.");
        }

        otpService.generateAndSendOtp(phoneNumber);
    }

    public LoginResponse verifyOtp(String phoneNumber, String code, String ipAddress) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new BadRequestException("User not found with phone number: " + phoneNumber));

        boolean isVerified = otpService.verifyOtp(phoneNumber, code);
        if (!isVerified) {
            auditService.logLogin(user.getUsername(), ipAddress, "FAILURE_OTP", "Invalid or expired OTP");
            throw new BadRequestException("Invalid or expired OTP code.");
        }

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtUtil.generateToken(userDetails);

        auditService.logLogin(user.getUsername(), ipAddress, "SUCCESS_OTP", null);

        return LoginResponse.builder()
                .token(token)
                .refreshToken("refresh-token-placeholder")
                .user(LoginResponse.UserDetailsDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .phoneNumber(user.getPhoneNumber())
                        .roles(user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toList()))
                        .build())
                .build();
    }
}
