package com.ecommerce.Repository;

import com.ecommerce.Entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository

public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findAllByIsDeletedFalse();
    Optional<User> findByEmail(String email);
    Optional<User> getByEmail(String email);
    Page<User> findByFirstNameOrLastNameOrEmailOrPhoneNumber(String firstName, String lastName, String email, String phoneNumber, Pageable pageable);
}
