package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.UserRole;

import java.util.UUID;

public interface IUserRoleService {
    void save(UserRole userRole);
    boolean saveByUserIdAndRoleId(UUID userId, UUID roleId);
}
