package com.gatmitra.notification.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notification_templates")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "template_key", length = 100, nullable = false)
    private String templateKey;

    @Column(name = "language_code", length = 5, nullable = false)
    private String languageCode;

    @Column(name = "notification_channel", length = 30)
    private String notificationChannel;

    @Column(name = "template_content", columnDefinition = "TEXT")
    private String templateContent;

    @Column(name = "is_active")
    private boolean isActive = true;
}
