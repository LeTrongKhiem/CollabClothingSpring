package com.ecommerce.Model.Users;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserChangePasswordModel {
    private String oldPassword;
    @NotEmpty(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Size(max = 20, message = "Password must be at most 20 characters")
    private String newPassword;
}
