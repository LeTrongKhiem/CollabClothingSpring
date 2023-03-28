package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Application.PreAuthorizes.AdminOnly;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.UserModel;
import com.ecommerce.Model.Users.UserChangePasswordModel;
import com.ecommerce.Model.Users.UserUpdateProfileModel;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
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
    @StaffRole
    public ResponseEntity<List<UserModel>> getAllModel(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "lastName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType)
    {
        List<UserModel> list = userService.getAllUsersModel(page, pageSize, search, sortBy, sortType);

        return new ResponseEntity<List<UserModel>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/all/active")
    @AdminOnly
    public List<UserModel> getAllActiveUsers() {
        return userService.findAllByIsDeletedFalse();
    }

    @PutMapping("/userUpdateProfile")
    public ResponseEntity<Boolean> userUpdateProfile(@RequestBody @Valid UserUpdateProfileModel userModel, BindingResult bindingResult) {
        User user = AuthenticateExtensions.getUser();
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        boolean result = userService.updateUser(user.getId(), userModel);
        if (result)
            return new ResponseEntity<Boolean>(true, new HttpHeaders(), HttpStatus.OK);
        else
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/userChangePassword")
    public ResponseEntity<Boolean> userChangePassword(@RequestBody @Valid UserChangePasswordModel userModel, BindingResult bindingResult) {
        UserModel user = AuthenticateExtensions.getUserModel();
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        boolean result = userService.userUpdatePassword(user.getId(), userModel);
        if (result)
            return new ResponseEntity<Boolean>(true, new HttpHeaders(), HttpStatus.OK);
        else
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/userProfile")
    public ResponseEntity<UserModel> userProfile() {
        UUID userId = AuthenticateExtensions.getUserId();
        UserModel result = userService.getProfileUser(userId);
        return new ResponseEntity<UserModel>(result, new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/adminCreateAccount")
    @AdminOnly
    public ResponseEntity<Boolean> adminCreateAccount(@RequestBody RegisterRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        UUID userId = AuthenticateExtensions.getUserId();
        boolean result = userService.createAccountByAdmin(userId, request);
        if (result)
            return new ResponseEntity<Boolean>(true, new HttpHeaders(), HttpStatus.OK);
        else
            return new ResponseEntity<Boolean>(false, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
