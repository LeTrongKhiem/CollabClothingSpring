package com.ecommerce.Setup.Auth.Model;

import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Date dob;
    private String address;
    private String phoneNumber;
    private int gender;
    private String userName;
}
