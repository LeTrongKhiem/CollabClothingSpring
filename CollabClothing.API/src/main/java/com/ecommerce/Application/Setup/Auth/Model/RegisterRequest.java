package com.ecommerce.Application.Setup.Auth.Model;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    @NotNull(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Size(max = 20, message = "Password must be at most 20 characters")
    @NotNull(message = "Password is required")
    private String password;
    @Nullable
    private String confirmPassword;
    @NotNull(message = "First name is required")
    private String firstName;
    @NotNull(message = "Last name is required")
    private String lastName;
    @NotNull(message = "Date of birth is required")
    private Date dob;
    @NotNull(message = "Address is required")
    private String address;
    @NotNull(message = "Phone number is required")
    private String phoneNumber;
    @NotNull(message = "Gender is required")
    private int gender;
    @Nullable
    private String userName;
}
