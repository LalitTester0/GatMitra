package com.gatmitra.auth.service;

import com.gatmitra.notification.entity.NotificationLog;
import com.gatmitra.notification.repository.NotificationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Value("${gatmitra.security.otp.expiration-minutes:5}")
    private int otpExpirationMinutes;

    @Autowired
    private NotificationLogRepository notificationLogRepository;

    // In-memory store for phone -> OTP details (code & expiry)
    private final Map<String, OtpDetails> otpStore = new ConcurrentHashMap<>();

    private static class OtpDetails {
        String code;
        LocalDateTime expiry;

        OtpDetails(String code, LocalDateTime expiry) {
            this.code = code;
            this.expiry = expiry;
        }
    }

    public void generateAndSendOtp(String phoneNumber) {
        // 1. Generate 6 digit numeric code
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(otpExpirationMinutes);

        // 2. Save to internal store
        otpStore.put(phoneNumber, new OtpDetails(otpCode, expiryTime));

        // 3. Construct WhatsApp notification log
        String content = "Hello, your GatMitra OTP verification code is " + otpCode + ". This code is valid for 5 minutes. Do not share it with anyone.";
        
        NotificationLog notificationLog = NotificationLog.builder()
                .recipient(phoneNumber)
                .type("WHATSAPP")
                .content(content)
                .status("SENT")
                .sentAt(LocalDateTime.now())
                .build();
        
        notificationLogRepository.save(notificationLog);
    }

    public boolean verifyOtp(String phoneNumber, String code) {
        OtpDetails details = otpStore.get(phoneNumber);
        if (details == null) {
            return false;
        }
        
        // Check expiry
        if (LocalDateTime.now().isAfter(details.expiry)) {
            otpStore.remove(phoneNumber);
            return false;
        }

        // Verify matches
        boolean isValid = details.code.equals(code);
        if (isValid) {
            otpStore.remove(phoneNumber); // Invalidate after successful verification
        }
        return isValid;
    }
}
