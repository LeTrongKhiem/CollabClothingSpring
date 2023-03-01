package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IUserRoleService;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Component
@Service
public class UserRoleService implements IUserRoleService {
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public void save(UserRole userRole) {
        userRoleRepository.save(userRole);
    }

    @Override
    public boolean saveByUserIdAndRoleId(UUID userId, UUID roleId) {
        return userRoleRepository.saveByUserIdAndRoleId(userId, roleId);
    }
}
