package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;

import java.util.Date;

public class UserMapping {
    public static User mapToUser(RegisterRequest request, String passwordHash) {
        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordHash);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAddress(request.getAddress());
        user.setDob(request.getDob());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setIsDeleted(false);
        user.setBlock(false);
        user.setEmailVerified(false);
        user.setUserType(1);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        user.setCreatedBy(user.getId());

        return user;
    }
}
