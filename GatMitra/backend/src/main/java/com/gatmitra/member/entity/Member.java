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

    @Column(name = "member_code", length = 30)
    private String memberCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bachat_gat_id", nullable = false)
    private BachatGat bachatGat;

    @Column(name = "full_name", length = 150)
    private String fullName;

    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Column(length = 20)
    private String gender;

    private LocalDate dob;

    @Column(name = "aadhaar_number", length = 20)
    private String aadhaarNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "nominee_name", length = 150)
    private String nomineeName;

    @Column(name = "nominee_relation", length = 100)
    private String nomineeRelation;

    @Column(name = "preferred_language", length = 5)
    private String preferredLanguage = "mr";

    @Column(length = 20)
    private String status = "ACTIVE";

    @Column(name = "profile_photo", columnDefinition = "TEXT")
    private String profilePhoto;
}
