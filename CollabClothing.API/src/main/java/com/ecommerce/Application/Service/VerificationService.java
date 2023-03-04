package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IVerificationService;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;
import com.ecommerce.Repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class VerificationService implements IVerificationService {
    @Autowired
    VerificationRepository verificationRepository;
    @Override
    public VerificationToken findByUser(User user) {
        return verificationRepository.findByUser(user);
    }

    @Override
    public VerificationToken findByUserId(UUID userId) {
        return verificationRepository.findByUserId(userId);
    }

    @Override
    public List<VerificationToken> findAllByUserOrderByExpiryDateDesc(User user) {
        return verificationRepository.findAllByUserOrderByExpiryDateDesc(user);
    }

    @Override
    public void save(VerificationToken token) {
        verificationRepository.save(token);
    }

    @Override
    public void deleteByUser(User user) {
        verificationRepository.deleteByUser(user);
    }

    @Override
    public void deleteByToken(String token) {
        verificationRepository.deleteByToken(token);
    }

    @Override
    public void deleteById(UUID id) {
        verificationRepository.deleteById(id);
    }

    @Override
    public VerificationToken findByToken(String token) {
        return verificationRepository.findByToken(token);
    }
}
