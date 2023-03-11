package com.ecommerce.Application.Abstractions;

import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.UserModel;
import com.ecommerce.Model.Users.UserChangePasswordModel;
import com.ecommerce.Model.Users.UserUpdateProfileModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserService {
    public User saveUser(User user);
    public Optional<User> findByEmail(String email);
    public Optional<User> findById(UUID userId);
    public Optional<User> getUserByEmail(String email);
    public List<UserModel> findAll();
    public List<UserModel> getAllUsersModel(int page, int pageSize, String search, String sort, String sortType);
    public boolean updateUser(UUID uuid, UserUpdateProfileModel userModel);
    public boolean userUpdatePassword(UUID uuid, UserChangePasswordModel userModel);
    public List<UserModel> findAllByIsDeletedFalse();
    public UserModel getProfileUser(UUID userId);
    public boolean createAccountByAdmin(UUID userId, RegisterRequest model);
}
