package com.gatmitra.member.entity;

import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.common.BaseEntity;
import com.gatmitra.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

@Entity
@Table(name = "members")
@SQLDelete(sql = "UPDATE members SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bachat_gat_id", nullable = false)
    private BachatGat bachatGat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate = LocalDate.now();

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE
}
