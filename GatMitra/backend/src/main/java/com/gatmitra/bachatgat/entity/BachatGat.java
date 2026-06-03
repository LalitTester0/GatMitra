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

    @Column(name = "group_code", length = 30, unique = true)
    private String groupCode;

    @Column(name = "group_name", length = 255, nullable = false)
    private String groupName;

    @Column(name = "registration_number", length = 100, unique = true)
    private String registrationNumber;

    @Column(name = "establishment_date", nullable = false)
    private LocalDate establishmentDate;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(length = 150, nullable = false)
    private String village;

    @Column(length = 150, nullable = false)
    private String taluka;

    @Column(length = 150, nullable = false)
    private String district;

    @Column(length = 100, nullable = false)
    private String state;

    @Column(length = 10, nullable = false)
    private String pincode;

    @Column(name = "monthly_contribution")
    private BigDecimal monthlyContribution;

    @Column(name = "max_members")
    private Integer maxMembers;

    @Column(name = "admin_user_id")
    private java.util.UUID adminUserId;

    @Column(name = "preferred_language", length = 5, nullable = false)
    private String preferredLanguage = "mr";

    @Column(length = 20, nullable = false)
    private String status = "ACTIVE";

    @Column(name = "deactivation_reason", columnDefinition = "TEXT")
    private String deactivationReason;

    @Column(name = "deactivated_at")
    private java.time.LocalDateTime deactivatedAt;
}
