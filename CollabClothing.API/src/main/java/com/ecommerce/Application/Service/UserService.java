package com.ecommerce.Application.Service;
import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Application.Mappings.UserMapping;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.UserModel;
import com.ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserModel> findAll() {
        List<User> list = userRepository.findAll();
        List<UserModel> listModel = UserMapping.mapListUserModel(list);
        return listModel;
    }

    @Override
    public List<UserModel> getAllUsersModel(int page, int pageSize, String search, String sort) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(sort));
        Page<User> users;
        if (search != null && !search.isEmpty()) {
            users = userRepository.findByFirstNameOrLastNameOrEmailOrPhoneNumber(search, search, search, search, pageable);
        }
        else
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
}
