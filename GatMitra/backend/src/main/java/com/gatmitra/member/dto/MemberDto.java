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

    @NotNull(message = "Bachat Gat ID is required")
    private UUID bachatGatId;

    private String bachatGatName; // Read-only helper

    private UUID userId; // Optional system user association

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    private LocalDate joinDate;

    private String status;
}
