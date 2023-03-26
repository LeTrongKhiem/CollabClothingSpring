package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Application.Exceptions.AppException;
import com.ecommerce.Application.Mappings.UserMapping;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.Role;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Model.Constants.RoleConstants;
import com.ecommerce.Model.UserModel;
import com.ecommerce.Model.Users.UserChangePasswordModel;
import com.ecommerce.Model.Users.UserUpdateProfileModel;
import com.ecommerce.Repository.RoleRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    private String defaultPassword;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Value("${default.passwordAdmin}")
    public void setDefaultPassword(String defaultPassword) {
        this.defaultPassword = defaultPassword;
    }
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(UUID userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserModel> findAll() {
        List<User> list = userRepository.findAll();
        List<UserModel> listModel = UserMapping.mapListUserModel(list);
        return listModel;
    }

    @Override
    public List<UserModel> getAllUsersModel(int page, int pageSize, String search, String sort, String sortType) {
        Pageable pageable;
        if (sortType != null && sortType.equals("desc")) {
            pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Order.desc(sort)));
        } else {
            pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Order.asc(sort)));
        }
        Page<User> users;
        if (search != null && !search.isEmpty()) {
            users = userRepository.findByFirstNameOrLastNameOrEmailOrPhoneNumber(search, search, search, search, pageable);
        } else
            users = userRepository.findAll(pageable);
        List<User> listUser = users.getContent();
        List<UserModel> listModel = UserMapping.mapListUserModel(listUser);
        int total = users.getTotalPages();
        int size = users.getSize();
        int number = users.getNumber();
        if (users.hasContent())
            return listModel;
        else
            return new ArrayList<UserModel>();
    }

    @Override
    public boolean updateUser(UUID uuid, UserUpdateProfileModel userModel) {
        User user = userRepository.findById(uuid).get();
        User updatedUser = UserMapping.userUpdateProfile(user, userModel);
        userRepository.save(updatedUser);
        return true;
    }

    @Override
    public boolean userUpdatePassword(UUID uuid, UserChangePasswordModel userModel) {
        User user = userRepository.findById(uuid).get();
        if (!passwordEncoder.matches(userModel.getOldPassword(), user.getPassword()))
            return false;
        user.setPasswordHash(passwordEncoder.encode(userModel.getNewPassword()));
        userRepository.save(user);
        return true;
    }

    @Override
    public List<UserModel> findAllByIsDeletedFalse() {
        List<User> users = userRepository.findAllByIsDeletedFalse();
        return UserMapping.mapListUserModel(users);
    }

    @Override
    public UserModel getProfileUser(UUID userId) {
        User user = userRepository.findById(userId).get();
        return UserMapping.mapToUserModel(user);
    }
    @Override
    public boolean createAccountByAdmin(UUID userId, RegisterRequest model) {
        User currentUser = userRepository.findById(userId).orElseThrow();
        if (!currentUser.getUser_roles().stream().anyMatch(x -> x.getRole().getId().equals(RoleConstants.ADMIN_ID))) {
            throw new AppException(400, "You don't have permission to create account");
        }
        Optional<User> checkUser = userRepository.findByEmail(model.getEmail());
        if (checkUser.isPresent()) {
            throw new AppException(400, "User already exists");
        }
        Role role = roleRepository.findById(RoleConstants.EMPLOYEE_ID).get();
        String password = passwordEncoder.encode(defaultPassword);
        User user = UserMapping.mapToAdmin(userId, model, password);
        userRepository.save(user);
        UserRole userRole = UserMapping.mapToRole(user, role);
        userRoleRepository.save(userRole);
        return true;
    }
}
