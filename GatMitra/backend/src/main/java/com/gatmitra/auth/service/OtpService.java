package com.gatmitra.auth.service;

import com.gatmitra.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class OtpService {

    @Value("${gatmitra.security.otp.expiration-minutes:5}")
    private int otpExpirationMinutes;

    // In-memory cache for OTPs: Map<MobileNumber, OtpData>
    private final Map<String, OtpData> otpCache = new ConcurrentHashMap<>();
    private final SecureRandom secureRandom = new SecureRandom();

    public String generateOtp(String mobileNumber) {
        // Generate a 6-digit OTP
        int otpValue = 100000 + secureRandom.nextInt(900000);
        String otp = String.valueOf(otpValue);
        
        OtpData otpData = new OtpData(otp, LocalDateTime.now().plusMinutes(otpExpirationMinutes));
        otpCache.put(mobileNumber, otpData);
        
        log.info("Generated OTP {} for mobile {}", otp, mobileNumber);
        return otp;
    }

    public boolean validateOtp(String mobileNumber, String otp) {
        OtpData otpData = otpCache.get(mobileNumber);
        
        if (otpData == null) {
            throw new BadRequestException("OTP not requested or expired for this number");
        }
        
        if (LocalDateTime.now().isAfter(otpData.expiryTime)) {
            otpCache.remove(mobileNumber);
            throw new BadRequestException("OTP has expired");
        }
        
        if (otpData.otp.equals(otp)) {
            // OTP is valid, remove it from cache
            otpCache.remove(mobileNumber);
            return true;
        }
        
        throw new BadRequestException("Invalid OTP");
    }

    private record OtpData(String otp, LocalDateTime expiryTime) {}
}
