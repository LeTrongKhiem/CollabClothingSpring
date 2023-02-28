package com.ecommerce.Model.Users;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class UserUpdateProfileModel {

    private String userName;
    @NotEmpty(message = "FirstName is required")
    private String firstName;
    @NotEmpty(message = "LastName is required")
    private String lastName;
    @NotEmpty(message = "PhoneNumber is required")
    private String phoneNumber;
    @NotEmpty(message = "Address is required")
    private String address;
    private Date dob;
    private int gender;
}
