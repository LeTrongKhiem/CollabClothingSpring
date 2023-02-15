package com.ecommerce.Setup.Auth.Model;

import lombok.*;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationRequest {
    private String email;
    private String password;
}
