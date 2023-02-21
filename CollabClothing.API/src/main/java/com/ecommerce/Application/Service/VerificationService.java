package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IVerificationService;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;
import com.ecommerce.Repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VerificationService implements IVerificationService {
    @Autowired
    VerificationRepository verificationRepository;
    @Override
    public VerificationToken findByUser(User user) {
        return verificationRepository.findByUser(user);
    }

    @Override
    public void save(VerificationToken token) {
        verificationRepository.save(token);
    }

    @Override
    public VerificationToken findByToken(String token) {
        return verificationRepository.findByToken(token);
    }
}
