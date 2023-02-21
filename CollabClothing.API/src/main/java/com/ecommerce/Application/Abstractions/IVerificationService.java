package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;

public interface IVerificationService {
    VerificationToken findByUser(User user);
    VerificationToken findByToken(String token);
    void save(VerificationToken token);
}
