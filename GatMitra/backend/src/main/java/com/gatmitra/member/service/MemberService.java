package com.gatmitra.member.service;

import com.gatmitra.audit.annotation.LogActivity;
import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.exception.ResourceNotFoundException;
import com.gatmitra.member.dto.MemberDto;
import com.gatmitra.member.entity.Member;
import com.gatmitra.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BachatGatRepository bachatGatRepository;

    public List<MemberDto> getAll() {
        return memberRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MemberDto> getByBachatGatId(UUID bachatGatId) {
        return memberRepository.findAll().stream() // Since there's no custom method in repository yet, we'll manually filter or assume it's created. Better to use repository if it exists.
                .filter(m -> m.getBachatGat().getId().equals(bachatGatId))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MemberDto getById(UUID id) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));
        return convertToDto(m);
    }

    @LogActivity(moduleName = "MEMBER", activityType = "CREATE")
    public MemberDto create(MemberDto dto) {
        BachatGat bg = bachatGatRepository.findById(dto.getBachatGatId())
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + dto.getBachatGatId()));

        Member m = Member.builder()
                .memberCode(dto.getMemberCode())
                .bachatGat(bg)
                .fullName(dto.getFullName())
                .mobileNumber(dto.getMobileNumber())
                .gender(dto.getGender())
                .dob(dto.getDob())
                .aadhaarNumber(dto.getAadhaarNumber())
                .address(dto.getAddress())
                .joiningDate(dto.getJoiningDate() != null ? dto.getJoiningDate() : LocalDate.now())
                .nomineeName(dto.getNomineeName())
                .nomineeRelation(dto.getNomineeRelation())
                .preferredLanguage(dto.getPreferredLanguage() != null ? dto.getPreferredLanguage() : "mr")
                .status("ACTIVE")
                .profilePhoto(dto.getProfilePhoto())
                .build();

        m = memberRepository.save(m);
        return convertToDto(m);
    }

    @LogActivity(moduleName = "MEMBER", activityType = "UPDATE")
    public MemberDto update(UUID id, MemberDto dto) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        BachatGat bg = bachatGatRepository.findById(dto.getBachatGatId())
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + dto.getBachatGatId()));

        m.setMemberCode(dto.getMemberCode());
        m.setBachatGat(bg);
        m.setFullName(dto.getFullName());
        m.setMobileNumber(dto.getMobileNumber());
        m.setGender(dto.getGender());
        m.setDob(dto.getDob());
        m.setAadhaarNumber(dto.getAadhaarNumber());
        m.setAddress(dto.getAddress());
        if (dto.getJoiningDate() != null) m.setJoiningDate(dto.getJoiningDate());
        m.setNomineeName(dto.getNomineeName());
        m.setNomineeRelation(dto.getNomineeRelation());
        if (dto.getPreferredLanguage() != null) m.setPreferredLanguage(dto.getPreferredLanguage());
        if (dto.getStatus() != null) m.setStatus(dto.getStatus());
        m.setProfilePhoto(dto.getProfilePhoto());

        m = memberRepository.save(m);
        return convertToDto(m);
    }

    @LogActivity(moduleName = "MEMBER", activityType = "DELETE")
    public void delete(UUID id) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        memberRepository.delete(m);
    }

    private MemberDto convertToDto(Member m) {
        return MemberDto.builder()
                .id(m.getId())
                .memberCode(m.getMemberCode())
                .bachatGatId(m.getBachatGat().getId())
                .bachatGatName(m.getBachatGat().getGroupName())
                .fullName(m.getFullName())
                .mobileNumber(m.getMobileNumber())
                .gender(m.getGender())
                .dob(m.getDob())
                .aadhaarNumber(m.getAadhaarNumber())
                .address(m.getAddress())
                .joiningDate(m.getJoiningDate())
                .nomineeName(m.getNomineeName())
                .nomineeRelation(m.getNomineeRelation())
                .preferredLanguage(m.getPreferredLanguage())
                .status(m.getStatus())
                .profilePhoto(m.getProfilePhoto())
                .build();
    }
}
