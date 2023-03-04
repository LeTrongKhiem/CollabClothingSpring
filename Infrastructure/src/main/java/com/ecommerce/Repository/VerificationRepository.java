package com.ecommerce.Repository;

import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface VerificationRepository extends JpaRepository<VerificationToken, UUID> {
    @Query("SELECT v FROM VerificationToken v WHERE v.token = ?1")
    VerificationToken findByToken(String token);
    VerificationToken findByUser(User user);
    VerificationToken findByUserId(UUID userId);
    List<VerificationToken> findAllByUserOrderByExpiryDateDesc(User user);
    void deleteByUser(User user);
    void deleteByToken(String token);
    void deleteById(UUID id);
}
