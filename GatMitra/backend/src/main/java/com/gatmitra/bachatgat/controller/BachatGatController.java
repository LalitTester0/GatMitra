package com.gatmitra.bachatgat.controller;

import com.gatmitra.bachatgat.dto.BachatGatDto;
import com.gatmitra.bachatgat.service.BachatGatService;
import com.gatmitra.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/bachatgat")
public class BachatGatController {

    @Autowired
    private BachatGatService bachatGatService;

    @GetMapping
    @PreAuthorize("hasAuthority('READ_BACHATGAT')")
    public ResponseEntity<ApiResponse<List<BachatGatDto>>> getAll() {
        List<BachatGatDto> list = bachatGatService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Bachat Gats retrieved successfully", list));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('READ_BACHATGAT')")
    public ResponseEntity<ApiResponse<BachatGatDto>> getById(@PathVariable UUID id) {
        BachatGatDto dto = bachatGatService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Bachat Gat details retrieved successfully", dto));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_BACHATGAT')")
    public ResponseEntity<ApiResponse<BachatGatDto>> create(@Valid @RequestBody BachatGatDto dto) {
        BachatGatDto created = bachatGatService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Bachat Gat created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('UPDATE_BACHATGAT')")
    public ResponseEntity<ApiResponse<BachatGatDto>> update(
            @PathVariable UUID id,
            @Valid @RequestBody BachatGatDto dto) {
        BachatGatDto updated = bachatGatService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Bachat Gat updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_BACHATGAT')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        bachatGatService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Bachat Gat deleted successfully"));
    }
}
