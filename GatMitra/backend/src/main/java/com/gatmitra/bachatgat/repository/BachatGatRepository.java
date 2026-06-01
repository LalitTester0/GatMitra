package com.gatmitra.bachatgat.repository;

import com.gatmitra.bachatgat.entity.BachatGat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BachatGatRepository extends JpaRepository<BachatGat, UUID> {
    Optional<BachatGat> findByRegistrationNumber(String registrationNumber);
    boolean existsByRegistrationNumber(String registrationNumber);
}
