package com.gatmitra.member.controller;

import com.gatmitra.member.dto.MemberDto;
import com.gatmitra.member.service.MemberService;
import com.gatmitra.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping
    @PreAuthorize("hasAuthority('READ_MEMBER')")
    public ResponseEntity<ApiResponse<List<MemberDto>>> getAll() {
        List<MemberDto> list = memberService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Members retrieved successfully", list));
    }

    @GetMapping("/group/{bachatGatId}")
    @PreAuthorize("hasAuthority('READ_MEMBER')")
    public ResponseEntity<ApiResponse<List<MemberDto>>> getByGroup(@PathVariable UUID bachatGatId) {
        List<MemberDto> list = memberService.getByBachatGatId(bachatGatId);
        return ResponseEntity.ok(ApiResponse.success("Group members retrieved successfully", list));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('READ_MEMBER')")
    public ResponseEntity<ApiResponse<MemberDto>> getById(@PathVariable UUID id) {
        MemberDto dto = memberService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Member details retrieved successfully", dto));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_MEMBER')")
    public ResponseEntity<ApiResponse<MemberDto>> create(@Valid @RequestBody MemberDto dto) {
        MemberDto created = memberService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Member registered successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('UPDATE_MEMBER')")
    public ResponseEntity<ApiResponse<MemberDto>> update(
            @PathVariable UUID id,
            @Valid @RequestBody MemberDto dto) {
        MemberDto updated = memberService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Member details updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_MEMBER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        memberService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Member deleted successfully"));
    }
}
