package com.ecommerce.Application.Setup.Auth.Extensions;

import com.ecommerce.Application.Mappings.UserMapping;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Model.UserModel;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class AuthenticateExtensions {
    public static UserModel getUserModel() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return UserMapping.mapToUserModel(user);
    }

    public static User getUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static UUID getUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }
}
