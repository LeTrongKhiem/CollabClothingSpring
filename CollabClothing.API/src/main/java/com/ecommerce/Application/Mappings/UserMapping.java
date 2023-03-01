package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.Role;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Model.Constants.RoleConstants;
import com.ecommerce.Model.UserModel;
import com.ecommerce.Model.Users.UserUpdateProfileModel;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class UserMapping {
    public static User mapToUser(RegisterRequest request, String passwordHash) {
        User user = new User();
        UUID id = UUID.randomUUID();
        user.setId(id);
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

    public static UserModel mapToUserModel(User user) {
        UserModel userModel = new UserModel();
        userModel.setId(user.getId());
        userModel.setUserName(user.getUsername());
        userModel.setFirstName(user.getFirstName());
        userModel.setLastName(user.getLastName());
        userModel.setPasswordHash(user.getPasswordHash());
        userModel.setPhoneNumber(user.getPhoneNumber());
        userModel.setAddress(user.getAddress());
        userModel.setEmail(user.getEmail());
        userModel.setCreatedDate(user.getCreatedDate());
        userModel.setEmailVerified(user.isEmailVerified());
        userModel.setDob(user.getDob());
        userModel.setGender(user.getGender());
        userModel.setBlock(user.isBlock());
        userModel.setUserType(user.getUserType());
        userModel.setLastLogin(user.getLastLogin());
        userModel.setModifiedBy(user.getModifiedBy());
        userModel.setModifiedDate(user.getModifiedDate());
        userModel.setDeleted(user.getIsDeleted());
        userModel.setDeletedBy(user.getDeletedBy());
        userModel.setDeletedDate(user.getDateDeleted());
        userModel.setRole(user.getUser_roles().stream().map(UserRole::getRole).map(role -> role.getName()).findFirst().orElse(null));
        return userModel;
    }

    public static User userUpdateProfile(User user, UserUpdateProfileModel userModel) {
        user.setUserName(userModel.getUserName().isEmpty() ? user.getUsername() : userModel.getUserName());
        user.setFirstName(userModel.getFirstName().isEmpty() ? user.getFirstName() : userModel.getFirstName());
        user.setLastName(userModel.getLastName().isEmpty() ? user.getLastName() : userModel.getLastName());
        user.setPhoneNumber(userModel.getPhoneNumber().isEmpty() ? user.getPhoneNumber() : userModel.getPhoneNumber());
        user.setAddress(userModel.getAddress().isEmpty() ? user.getAddress() : userModel.getAddress());
        user.setDob(userModel.getDob() == null ? user.getDob() : userModel.getDob());
        user.setGender(userModel.getGender() == 0 ? user.getGender() : userModel.getGender());

        return user;
    }

    public static List<UserModel> mapListUserModel(List<User> users) {
        return users.stream().map(UserMapping::mapToUserModel).toList();
    }

    public static UserRole mapToRole(User user, Role role) {
        UUID id = UUID.randomUUID();
        UserRole roleCreate = new UserRole();
        roleCreate.setId(id);
        roleCreate.setRole(role);
        roleCreate.setUser(user);
        return roleCreate;
    }
}
