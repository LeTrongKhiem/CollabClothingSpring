package com.ecommerce.Setup.Auth.Service;

import com.ecommerce.Entities.Role;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Model.Constants.RoleConstants;
import com.ecommerce.Repository.RoleRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Setup.Auth.Model.AuthenticationRequest;
import com.ecommerce.Setup.Auth.Model.AuthenticationResponse;
import com.ecommerce.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Setup.Config.JwtService;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Set;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        UUID uuid = UUID.randomUUID();
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .address(request.getAddress())
                .dob(request.getDob())
                .phoneNumber(request.getPhoneNumber())
                .userName(request.getUserName())
                .gender(request.getGender())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();
        Role role = roleRepository.findById(RoleConstants.USER_ID).get();
        user.setUser_roles(new HashSet<UserRole>() {{
            add(new UserRole(user, role));
        }});
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
