package com.ecommerce.Abstractions;

import com.ecommerce.Entities.User;

public interface IUserDAO {
    public boolean saveUser(User user);
}
