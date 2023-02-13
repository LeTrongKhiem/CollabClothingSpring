package com.ecommerce.DAO;

import com.ecommerce.Abstractions.IUserDAO;
import com.ecommerce.Entities.User;
import com.ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserDAO implements IUserDAO {
    UserRepository userRepository;

    @Override
    public boolean saveUser(User user) {
        userRepository.save(user);
        return false;
    }
}
