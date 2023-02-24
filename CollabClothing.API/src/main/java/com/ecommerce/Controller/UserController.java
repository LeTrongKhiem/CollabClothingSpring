package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserModel> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("getAllUsers")
    public ResponseEntity<List<UserModel>> getAllModel(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "lastName") String sortBy)
    {
        List<UserModel> list = userService.getAllUsersModel(page, pageSize, search, sortBy);

        return new ResponseEntity<List<UserModel>>(list, new HttpHeaders(), HttpStatus.OK);
    }
}
