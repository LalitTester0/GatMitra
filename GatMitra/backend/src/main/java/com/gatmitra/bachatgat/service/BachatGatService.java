package com.gatmitra.bachatgat.service;

import com.gatmitra.bachatgat.dto.BachatGatDto;
import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.exception.BadRequestException;
import com.gatmitra.exception.ResourceNotFoundException;
import com.gatmitra.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BachatGatService {

    @Autowired
    private BachatGatRepository bachatGatRepository;

    @Autowired
    private AuditService auditService;

    private CustomUserDetails getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) authentication.getPrincipal();
        }
        return null;
    }

    public List<BachatGatDto> getAll() {
        return bachatGatRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BachatGatDto getById(UUID id) {
        BachatGat bg = bachatGatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + id));
        return convertToDto(bg);
    }

    public BachatGatDto create(BachatGatDto dto) {
        if (bachatGatRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new BadRequestException("Bachat Gat already exists with registration number: " + dto.getRegistrationNumber());
        }

        BachatGat bg = BachatGat.builder()
                .name(dto.getName())
                .registrationNumber(dto.getRegistrationNumber())
                .establishedDate(dto.getEstablishedDate())
                .description(dto.getDescription())
                .monthlySavingsAmount(dto.getMonthlySavingsAmount())
                .isActive(true)
                .build();

        bg = bachatGatRepository.save(bg);

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "CREATE_BACHATGAT",
                "BachatGat",
                bg.getId().toString(),
                "Registered new Bachat Gat: " + bg.getName()
        );

        return convertToDto(bg);
    }

    public BachatGatDto update(UUID id, BachatGatDto dto) {
        BachatGat bg = bachatGatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + id));

        // Check registration number conflict if changing
        if (!bg.getRegistrationNumber().equals(dto.getRegistrationNumber()) &&
                bachatGatRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new BadRequestException("Another Bachat Gat is already registered with registration number: " + dto.getRegistrationNumber());
        }

        bg.setName(dto.getName());
        bg.setRegistrationNumber(dto.getRegistrationNumber());
        bg.setEstablishedDate(dto.getEstablishedDate());
        bg.setDescription(dto.getDescription());
        bg.setMonthlySavingsAmount(dto.getMonthlySavingsAmount());
        bg.setActive(dto.isActive());

        bg = bachatGatRepository.save(bg);

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "UPDATE_BACHATGAT",
                "BachatGat",
                bg.getId().toString(),
                "Updated Bachat Gat parameters for: " + bg.getName()
        );

        return convertToDto(bg);
    }

    public void delete(UUID id) {
        BachatGat bg = bachatGatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + id));

        bachatGatRepository.delete(bg); // Executes soft delete via @SQLDelete

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "DELETE_BACHATGAT",
                "BachatGat",
                id.toString(),
                "Soft deleted Bachat Gat: " + bg.getName()
        );
    }

    private BachatGatDto convertToDto(BachatGat bg) {
        return BachatGatDto.builder()
                .id(bg.getId())
                .name(bg.getName())
                .registrationNumber(bg.getRegistrationNumber())
                .establishedDate(bg.getEstablishedDate())
                .description(bg.getDescription())
                .monthlySavingsAmount(bg.getMonthlySavingsAmount())
                .isActive(bg.isActive())
                .build();
    }
}
