package com.ecommerce.Repository;

import com.ecommerce.Entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
    @Modifying
    @Query(value = "insert into user_role (user_id, role_id) values (?1, ?2) ", nativeQuery = true)
    boolean saveByUserIdAndRoleId(UUID userId, UUID roleId);
}
