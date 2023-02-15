package com.ecommerce.Setup.Auth.Controller;

import com.ecommerce.Setup.Auth.Model.AuthenticationRequest;
import com.ecommerce.Setup.Auth.Model.AuthenticationResponse;
import com.ecommerce.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Setup.Auth.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
