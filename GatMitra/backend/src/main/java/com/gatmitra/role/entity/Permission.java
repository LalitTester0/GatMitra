package com.gatmitra.role.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "module_name", length = 100, nullable = false)
    private String moduleName;

    @Column(name = "permission_name", length = 100, nullable = false)
    private String permissionName;

    @Column(name = "permission_code", length = 100, unique = true, nullable = false)
    private String permissionCode;
}
