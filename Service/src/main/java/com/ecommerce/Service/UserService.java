package com.ecommerce.Service;

import com.ecommerce.Abstractions.IUserDAO;
import com.ecommerce.Abstractions.IUserService;
import com.ecommerce.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService implements IUserService {

    @Autowired
    private IUserDAO userDAO;
    @Override
    public boolean saveUser(User user) {
        return false;
    }
}
