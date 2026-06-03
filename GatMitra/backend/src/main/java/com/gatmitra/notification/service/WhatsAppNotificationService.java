package com.gatmitra.notification.service;

import com.gatmitra.notification.entity.NotificationLog;
import com.gatmitra.notification.repository.NotificationLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class WhatsAppNotificationService {

    private final NotificationLogRepository notificationLogRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${gatmitra.whatsapp.token:mock_token}")
    private String whatsappToken;

    @Value("${gatmitra.whatsapp.phone-number-id:mock_phone_id}")
    private String phoneNumberId;
    
    @Value("${gatmitra.whatsapp.template-name:gatmitra_otp}")
    private String otpTemplateName;

    public void sendOtpMessage(String recipientNumber, String otp) {
        log.info("Initiating WhatsApp message to {} with OTP {}", recipientNumber, otp);
        
        // Log to database first as PENDING
        NotificationLog notificationLog = NotificationLog.builder()
                .recipientMobileNumber(recipientNumber)
                .notificationType("WHATSAPP_OTP")
                .deliveryStatus("PENDING")
                .sentAt(LocalDateTime.now())
                .build();
        notificationLog = notificationLogRepository.save(notificationLog);

        if ("mock_token".equals(whatsappToken)) {
            log.warn("WhatsApp Token is mock_token. Skipping actual API call. Simulated SUCCESS.");
            notificationLog.setDeliveryStatus("SUCCESS");
            notificationLogRepository.save(notificationLog);
            return;
        }

        try {
            // Usually the API endpoint is v17.0 or whichever is latest
            String url = "https://graph.facebook.com/v17.0/" + phoneNumberId + "/messages";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(whatsappToken);

            String payload = """
            {
                "messaging_product": "whatsapp",
                "to": "%s",
                "type": "template",
                "template": {
                    "name": "%s",
                    "language": {
                        "code": "en"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": "%s"
                                }
                            ]
                        }
                    ]
                }
            }
            """.formatted(recipientNumber, otpTemplateName, otp);

            HttpEntity<String> request = new HttpEntity<>(payload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            
            if (response.getStatusCode().is2xxSuccessful()) {
                notificationLog.setDeliveryStatus("SUCCESS");
                log.info("WhatsApp message sent successfully to {}", recipientNumber);
            } else {
                notificationLog.setDeliveryStatus("FAILED");
                notificationLog.setResponsePayload("Status Code: " + response.getStatusCode());
                log.error("Failed to send WhatsApp message. Status: {}", response.getStatusCode());
            }

        } catch (Exception e) {
            notificationLog.setDeliveryStatus("ERROR");
            notificationLog.setResponsePayload(e.getMessage());
            log.error("Error sending WhatsApp message to {}: {}", recipientNumber, e.getMessage());
        } finally {
            notificationLogRepository.save(notificationLog);
        }
    }
}
