package com.gatmitra.member.service;

import com.gatmitra.bachatgat.entity.BachatGat;
import com.gatmitra.bachatgat.repository.BachatGatRepository;
import com.gatmitra.member.dto.MemberDto;
import com.gatmitra.member.entity.Member;
import com.gatmitra.member.repository.MemberRepository;
import com.gatmitra.user.entity.User;
import com.gatmitra.user.repository.UserRepository;
import com.gatmitra.audit.service.AuditService;
import com.gatmitra.exception.ResourceNotFoundException;
import com.gatmitra.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditService auditService;

    private CustomUserDetails getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) authentication.getPrincipal();
        }
        return null;
    }

    public List<MemberDto> getAll() {
        return memberRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MemberDto> getByBachatGatId(UUID bachatGatId) {
        return memberRepository.findByBachatGatId(bachatGatId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MemberDto getById(UUID id) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));
        return convertToDto(m);
    }

    public MemberDto create(MemberDto dto) {
        BachatGat bg = bachatGatRepository.findById(dto.getBachatGatId())
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + dto.getBachatGatId()));

        User user = null;
        if (dto.getUserId() != null) {
            user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User association not found with ID: " + dto.getUserId()));
        }

        Member m = Member.builder()
                .bachatGat(bg)
                .user(user)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phoneNumber(dto.getPhoneNumber())
                .joinDate(dto.getJoinDate() != null ? dto.getJoinDate() : LocalDate.now())
                .status("ACTIVE")
                .build();

        m = memberRepository.save(m);

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "CREATE_MEMBER",
                "Member",
                m.getId().toString(),
                "Registered new member: " + m.getFirstName() + " " + m.getLastName() + " to group: " + bg.getName()
        );

        return convertToDto(m);
    }

    public MemberDto update(UUID id, MemberDto dto) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        BachatGat bg = bachatGatRepository.findById(dto.getBachatGatId())
                .orElseThrow(() -> new ResourceNotFoundException("Bachat Gat not found with ID: " + dto.getBachatGatId()));

        User user = null;
        if (dto.getUserId() != null) {
            user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User association not found with ID: " + dto.getUserId()));
        }

        m.setBachatGat(bg);
        m.setUser(user);
        m.setFirstName(dto.getFirstName());
        m.setLastName(dto.getLastName());
        m.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getJoinDate() != null) {
            m.setJoinDate(dto.getJoinDate());
        }
        if (dto.getStatus() != null) {
            m.setStatus(dto.getStatus());
        }

        m = memberRepository.save(m);

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "UPDATE_MEMBER",
                "Member",
                m.getId().toString(),
                "Updated member details for: " + m.getFirstName() + " " + m.getLastName()
        );

        return convertToDto(m);
    }

    public void delete(UUID id) {
        Member m = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        memberRepository.delete(m); // Executes soft delete via @SQLDelete

        var currentUser = getCurrentUser();
        auditService.logActivity(
                currentUser != null ? currentUser.getUser() : null,
                "DELETE_MEMBER",
                "Member",
                id.toString(),
                "Soft deleted member record: " + m.getFirstName() + " " + m.getLastName()
        );
    }

    private MemberDto convertToDto(Member m) {
        return MemberDto.builder()
                .id(m.getId())
                .bachatGatId(m.getBachatGat().getId())
                .bachatGatName(m.getBachatGat().getName())
                .userId(m.getUser() != null ? m.getUser().getId() : null)
                .firstName(m.getFirstName())
                .lastName(m.getLastName())
                .phoneNumber(m.getPhoneNumber())
                .joinDate(m.getJoinDate())
                .status(m.getStatus())
                .build();
    }
}
