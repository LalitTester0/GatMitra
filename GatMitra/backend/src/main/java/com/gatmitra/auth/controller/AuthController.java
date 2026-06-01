package com.gatmitra.auth.controller;

import com.gatmitra.auth.dto.LoginRequest;
import com.gatmitra.auth.dto.LoginResponse;
import com.gatmitra.auth.dto.OtpRequest;
import com.gatmitra.auth.service.AuthService;
import com.gatmitra.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpServletRequest) {
        String ipAddress = httpServletRequest.getRemoteAddr();
        LoginResponse response = authService.login(request, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/otp/request")
    public ResponseEntity<ApiResponse<String>> requestOtp(
            @Valid @RequestBody OtpRequest.Request request) {
        authService.requestOtp(request.getPhoneNumber());
        return ResponseEntity.ok(ApiResponse.success("OTP has been sent to your WhatsApp number"));
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<ApiResponse<LoginResponse>> verifyOtp(
            @Valid @RequestBody OtpRequest.Verify request,
            HttpServletRequest httpServletRequest) {
        String ipAddress = httpServletRequest.getRemoteAddr();
        LoginResponse response = authService.verifyOtp(request.getPhoneNumber(), request.getCode(), ipAddress);
        return ResponseEntity.ok(ApiResponse.success("OTP verification successful", response));
    }
}
