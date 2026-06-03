package com.gatmitra.auth.service;

import com.gatmitra.auth.dto.AuthResponse;
import com.gatmitra.auth.dto.SendOtpRequest;
import com.gatmitra.auth.dto.VerifyOtpRequest;
import com.gatmitra.exception.ResourceNotFoundException;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.member.entity.Member;
import com.gatmitra.member.repository.MemberRepository;
import com.gatmitra.notification.service.WhatsAppNotificationService;
import com.gatmitra.security.CustomUserDetails;
import com.gatmitra.security.JwtUtil;
import com.gatmitra.user.entity.User;
import com.gatmitra.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final OtpService otpService;
    private final JwtUtil jwtUtil;
    private final WhatsAppNotificationService whatsappService;
    private final AuditService auditService;

    public void sendOtp(SendOtpRequest request) {
        String mobileNumber = request.getMobileNumber();
        Optional<User> userOpt = userRepository.findByMobileNumber(mobileNumber);
        Optional<Member> memberOpt = memberRepository.findByMobileNumber(mobileNumber);

        if (userOpt.isEmpty() && memberOpt.isEmpty()) {
            throw new ResourceNotFoundException("No account found with mobile number: " + mobileNumber);
        }

        if (userOpt.isPresent() && !"ACTIVE".equals(userOpt.get().getStatus())) {
            throw new IllegalArgumentException("User account is inactive");
        }
        
        if (memberOpt.isPresent() && !"ACTIVE".equals(memberOpt.get().getStatus())) {
            throw new IllegalArgumentException("Member account is inactive");
        }

        String otp = otpService.generateOtp(mobileNumber);
        
        // Send OTP via WhatsApp Cloud API
        whatsappService.sendOtpMessage(mobileNumber, otp);
        log.info("OTP generation process completed for {}", mobileNumber);
    }

    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        String mobileNumber = request.getMobileNumber();
        // Validate OTP
        otpService.validateOtp(mobileNumber, request.getOtp());

        Optional<User> userOpt = userRepository.findByMobileNumber(mobileNumber);
        Optional<Member> memberOpt = memberRepository.findByMobileNumber(mobileNumber);

        CustomUserDetails userDetails;
        String token;
        AuthResponse response;

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            userDetails = new CustomUserDetails(user);
            token = jwtUtil.generateToken(userDetails);
            auditService.logLogin(user.getId(), "SUCCESS");

            response = AuthResponse.builder()
                    .token(token)
                    .userId(user.getId())
                    .mobileNumber(user.getMobileNumber())
                    .firstName(user.getFullName())
                    .lastName("")
                    .role(user.getRole() != null ? user.getRole().getRoleCode() : null)
                    .build();
        } else if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            userDetails = new CustomUserDetails(member);
            token = jwtUtil.generateToken(userDetails);
            auditService.logLogin(member.getId(), "SUCCESS");

            response = AuthResponse.builder()
                    .token(token)
                    .userId(member.getId())
                    .mobileNumber(member.getMobileNumber())
                    .firstName(member.getFullName())
                    .lastName("")
                    .role("MEMBER")
                    .build();
        } else {
            throw new ResourceNotFoundException("No account found with mobile number: " + mobileNumber);
        }

        return response;
    }
}
