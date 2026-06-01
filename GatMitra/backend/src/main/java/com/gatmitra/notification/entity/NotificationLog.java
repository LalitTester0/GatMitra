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

    @Column(nullable = false)
    private String recipient;

    @Column(nullable = false)
    private String type; // WHATSAPP, SMS, EMAIL

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false)
    private String status = "PENDING"; // SENT, FAILED, PENDING

    @Column(name = "sent_at")
    private LocalDateTime sentAt = LocalDateTime.now();

    @Column(name = "error_message")
    private String errorMessage;
}
