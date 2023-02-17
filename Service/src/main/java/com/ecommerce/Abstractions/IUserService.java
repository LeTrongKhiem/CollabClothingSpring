package com.ecommerce.Abstractions;

import com.ecommerce.Entities.User;

import java.util.Optional;

public interface IUserService {
    public User saveUser(User user);
    public Optional<User> findByEmail(String email);

}
