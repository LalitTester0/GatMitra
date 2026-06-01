package com.gatmitra.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class OtpRequest {
    @Data
    public static class Request {
        @NotBlank(message = "Phone number is required")
        private String phoneNumber;
    }

    @Data
    public static class Verify {
        @NotBlank(message = "Phone number is required")
        private String phoneNumber;

        @NotBlank(message = "OTP code is required")
        private String code;
    }
}
