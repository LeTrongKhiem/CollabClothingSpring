package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;

import java.util.Date;

public class VerificationMapping {
    public static VerificationToken mapToVerificationToken(String token, User user) {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 24));
        return verificationToken;
    }
}
