package com.ecommerce.Application.Setup.Auth.Model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationRequest {
    @NotEmpty(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;
    @NotEmpty(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Size(max = 20, message = "Password must be at most 20 characters")
    private String password;
}
