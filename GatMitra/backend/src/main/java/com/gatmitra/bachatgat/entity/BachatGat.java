package com.gatmitra.bachatgat.entity;

import com.gatmitra.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "bachat_gat")
@SQLDelete(sql = "UPDATE bachat_gat SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BachatGat extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(name = "registration_number", unique = true, nullable = false)
    private String registrationNumber;

    @Column(name = "established_date")
    private LocalDate establishedDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "monthly_savings_amount", nullable = false)
    private BigDecimal monthlySavingsAmount = BigDecimal.ZERO;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}
