package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.User;
import com.ecommerce.Model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    public User saveUser(User user);
    public Optional<User> findByEmail(String email);
    public List<UserModel> findAll();
    public List<UserModel> getAllUsersModel(int page, int pageSize, String search, String sort);
}
