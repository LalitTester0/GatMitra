package com.gatmitra.bachatgat.service;

import com.gatmitra.audit.annotation.LogActivity;
import com.gatmitra.bachatgat.dto.BachatGatDto;
import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.exception.BadRequestException;
import com.gatmitra.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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

    @LogActivity(moduleName = "BACHAT_GAT", activityType = "CREATE")
    public BachatGatDto create(BachatGatDto dto) {
        if (bachatGatRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new BadRequestException("Bachat Gat already exists with registration number: " + dto.getRegistrationNumber());
        }

        BachatGat bg = BachatGat.builder()
                .groupName(dto.getGroupName())
                .groupCode(dto.getGroupCode())
                .registrationNumber(dto.getRegistrationNumber())
                .establishmentDate(dto.getEstablishmentDate())
                .address(dto.getAddress())
                .village(dto.getVillage())
                .taluka(dto.getTaluka())
                .district(dto.getDistrict())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .monthlyContribution(dto.getMonthlyContribution())
                .maxMembers(dto.getMaxMembers())
                .preferredLanguage(dto.getPreferredLanguage() != null ? dto.getPreferredLanguage() : "mr")
                .status("ACTIVE")
                .build();

        bg = bachatGatRepository.save(bg);
        return convertToDto(bg);
    }

    @LogActivity(moduleName = "BACHAT_GAT", activityType = "UPDATE")
    public BachatGatDto update(UUID id, BachatGatDto dto) {
        BachatGat bg = bachatGatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + id));

        if (!bg.getRegistrationNumber().equals(dto.getRegistrationNumber()) &&
                bachatGatRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new BadRequestException("Another Bachat Gat is already registered with registration number: " + dto.getRegistrationNumber());
        }

        bg.setGroupName(dto.getGroupName());
        bg.setGroupCode(dto.getGroupCode());
        bg.setRegistrationNumber(dto.getRegistrationNumber());
        bg.setEstablishmentDate(dto.getEstablishmentDate());
        bg.setAddress(dto.getAddress());
        bg.setVillage(dto.getVillage());
        bg.setTaluka(dto.getTaluka());
        bg.setDistrict(dto.getDistrict());
        bg.setState(dto.getState());
        bg.setPincode(dto.getPincode());
        bg.setMonthlyContribution(dto.getMonthlyContribution());
        bg.setMaxMembers(dto.getMaxMembers());
        
        if (dto.getPreferredLanguage() != null) {
            bg.setPreferredLanguage(dto.getPreferredLanguage());
        }
        if (dto.getStatus() != null) {
            bg.setStatus(dto.getStatus());
        }

        bg = bachatGatRepository.save(bg);
        return convertToDto(bg);
    }

    @LogActivity(moduleName = "BACHAT_GAT", activityType = "DELETE")
    public void delete(UUID id) {
        BachatGat bg = bachatGatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + id));

        bachatGatRepository.delete(bg);
    }

    private BachatGatDto convertToDto(BachatGat bg) {
        return BachatGatDto.builder()
                .id(bg.getId())
                .groupName(bg.getGroupName())
                .groupCode(bg.getGroupCode())
                .registrationNumber(bg.getRegistrationNumber())
                .establishmentDate(bg.getEstablishmentDate())
                .address(bg.getAddress())
                .village(bg.getVillage())
                .taluka(bg.getTaluka())
                .district(bg.getDistrict())
                .state(bg.getState())
                .pincode(bg.getPincode())
                .monthlyContribution(bg.getMonthlyContribution())
                .maxMembers(bg.getMaxMembers())
                .preferredLanguage(bg.getPreferredLanguage())
                .status(bg.getStatus())
                .build();
    }
}
