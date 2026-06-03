package com.gatmitra.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private UUID id;

    private String memberCode;

    @NotNull(message = "Bachat Gat ID is required")
    private UUID bachatGatId;

    private String bachatGatName; // Read-only helper

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    private String gender;

    private LocalDate dob;

    private String aadhaarNumber;

    private String address;

    private LocalDate joiningDate;

    private String nomineeName;

    private String nomineeRelation;

    private String preferredLanguage;

    private String status;

    private String profilePhoto;
}
