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
    private String name;

    @NotBlank(message = "Registration number is required")
    private String registrationNumber;

    private LocalDate establishedDate;

    private String description;

    @NotNull(message = "Monthly savings amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Monthly savings amount must be greater than 0")
    private BigDecimal monthlySavingsAmount;

    private boolean isActive;
}
