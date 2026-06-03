package com.gatmitra.bachatgat.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BachatGatDto {
    private UUID id;

    @NotBlank(message = "Bachat Gat name is required")
    private String groupName;

    private String groupCode;

    @NotBlank(message = "Registration number is required")
    private String registrationNumber;

    @NotNull(message = "Establishment date is required")
    private LocalDate establishmentDate;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Village is required")
    private String village;

    @NotBlank(message = "Taluka is required")
    private String taluka;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotNull(message = "Monthly contribution amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Monthly contribution amount must be greater than 0")
    private BigDecimal monthlyContribution;

    private Integer maxMembers;
    
    private String preferredLanguage;

    private String status;
}
