package com.gatmitra.user.entity;

import com.gatmitra.common.BaseEntity;
import com.gatmitra.role.entity.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Set;

@Entity
@Table(name = "users")
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(name = "mobile_number", length = 15, nullable = false, unique = true)
    private String mobileNumber;

    @Column(name = "full_name", length = 150)
    private String fullName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "bachat_gat_id")
    private java.util.UUID bachatGatId;

    @Column(name = "preferred_language", length = 5, nullable = false)
    private String preferredLanguage = "mr";

    @Column(name = "status", length = 20, nullable = false)
    private String status = "ACTIVE";

    @Column(name = "last_login_at")
    private java.time.LocalDateTime lastLoginAt;

    @Column(name = "whatsapp_enabled")
    private Boolean whatsappEnabled = true;

    @Column(name = "device_id", length = 255)
    private String deviceId;
}
