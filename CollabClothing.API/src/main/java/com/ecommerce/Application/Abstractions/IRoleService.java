package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Role;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
public interface IRoleService {
    public Optional<Role> findById(UUID id);
}
