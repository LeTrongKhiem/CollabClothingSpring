package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IRoleService;
import com.ecommerce.Entities.Role;
import com.ecommerce.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Component
@Service
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public Optional<Role> findById(UUID id) {
        return roleRepository.findById(id);
    }
}
