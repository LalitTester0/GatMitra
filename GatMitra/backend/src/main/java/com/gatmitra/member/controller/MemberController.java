package com.gatmitra.member.controller;

import com.gatmitra.common.ApiResponse;
import com.gatmitra.member.dto.MemberDto;
import com.gatmitra.member.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<MemberDto>>> getAll() {
        List<MemberDto> list = memberService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Members retrieved successfully", list));
    }

    @GetMapping("/bachatgat/{bachatGatId}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN', 'MEMBER')")
    public ResponseEntity<ApiResponse<List<MemberDto>>> getByBachatGatId(@PathVariable UUID bachatGatId) {
        List<MemberDto> list = memberService.getByBachatGatId(bachatGatId);
        return ResponseEntity.ok(ApiResponse.success("Members retrieved successfully", list));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN', 'MEMBER')")
    public ResponseEntity<ApiResponse<MemberDto>> getById(@PathVariable UUID id) {
        MemberDto dto = memberService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Member details retrieved successfully", dto));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    public ResponseEntity<ApiResponse<MemberDto>> create(@Valid @RequestBody MemberDto dto) {
        MemberDto created = memberService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Member created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    public ResponseEntity<ApiResponse<MemberDto>> update(
            @PathVariable UUID id,
            @Valid @RequestBody MemberDto dto) {
        MemberDto updated = memberService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Member updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        memberService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Member deleted successfully"));
    }
}
