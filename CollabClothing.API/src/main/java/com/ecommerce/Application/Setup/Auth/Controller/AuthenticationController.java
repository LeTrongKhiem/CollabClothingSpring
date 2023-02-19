package com.ecommerce.Application.Setup.Auth.Controller;

import com.ecommerce.Application.Setup.Auth.Model.AuthenticationRequest;
import com.ecommerce.Application.Setup.Auth.Model.AuthenticationResponse;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Application.Setup.Auth.Service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "localhost:3000")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @Autowired
    private Environment environment;

    @PostMapping("/register")
    @ExceptionHandler
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
        ResponseEntity.status(400).body("User already exists");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    @ExceptionHandler
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new AuthenticationResponse());
        }
    }
}
