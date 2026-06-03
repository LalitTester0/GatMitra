package com.gatmitra.notification.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notification_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "recipient_mobile_number", length = 15)
    private String recipientMobileNumber;

    @Column(name = "notification_type", length = 50)
    private String notificationType;

    @Column(length = 30)
    private String channel;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "delivery_status", length = 20)
    private String deliveryStatus;

    @Column(name = "response_payload", columnDefinition = "TEXT")
    private String responsePayload;

    @Column(name = "sent_at")
    private LocalDateTime sentAt = LocalDateTime.now();
}
