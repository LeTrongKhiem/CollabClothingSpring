package com.ecommerce.Application.Setup.Auth.Controller;

import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Application.Setup.Auth.Model.AuthenticationRequest;
import com.ecommerce.Application.Setup.Auth.Model.AuthenticationResponse;
import com.ecommerce.Application.Setup.Auth.Model.ForgotPasswordModel;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Application.Setup.Auth.Service.AuthenticationService;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.AppSettings;
import com.ecommerce.Model.GenericResponse;
import com.ecommerce.Model.UserModel;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000/"})
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @Autowired
    IUserService userService;
    @Autowired
    private Environment environment;
    @Autowired
    private AppSettings appSettings;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request, HttpServletRequest httpServletRequest) {
        String result = "User registered successfully";
        try {
            authenticationService.register(request, appSettings.getPath());
        } catch (HttpClientErrorException.BadRequest e) {
            result = e.getMessage();
        }
        return result;
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("/getByEmail")
    public Optional<UserModel> getByEmail(@RequestParam("email") String email) {
        return authenticationService.findByEmail(email);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new AuthenticationResponse());
        }
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (authenticationService.verify(code)) {
            return "Verification successful";
        } else {
            return "Verification failed";
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("email") String email, HttpServletRequest httpServletRequest) throws MessagingException, UnsupportedEncodingException {
        String siteURL = getSiteURL(httpServletRequest);
        var result = authenticationService.resetPassword(email, appSettings.getPath());
        if (result != null) {
            return ResponseEntity.ok("Password reset link sent to your email");
        } else {
            return ResponseEntity.status(400).body("Email not found");
        }
    }

    @GetMapping("/changePassword")
    public String showChangePasswordPage(@RequestParam("code") String token) {
        var error = authenticationService.validatePasswordResetToken(token);
        if (error != null)
            return error;
        return token;
    }

    @PostMapping("/savePassword")
    public ResponseEntity<String> savePassword(@Valid @RequestBody ForgotPasswordModel model) {
        var result = authenticationService.savePassword(model);
        if (result != null) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(400).body("Password reset failed");
        }
    }
}
