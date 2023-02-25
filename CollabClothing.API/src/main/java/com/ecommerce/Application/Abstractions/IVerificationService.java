package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;

import java.util.UUID;

public interface IVerificationService {
    VerificationToken findByUser(User user);
    VerificationToken findByToken(String token);
    void save(VerificationToken token);
    void deleteByUser(User user);
    void deleteByToken(String token);
    void deleteById(UUID id);
}
