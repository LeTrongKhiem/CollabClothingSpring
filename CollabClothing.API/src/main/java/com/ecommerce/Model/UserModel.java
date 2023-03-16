package com.ecommerce.Model;

import com.ecommerce.Entities.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class UserModel {
    private UUID id;
    private String userName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String email;
    private boolean isEmailVerified;
    private Date dob;
    private int gender;
    private boolean isBlock;
    private int userType;
    private Date lastLogin;
    private Date createdDate;
    private UUID modifiedBy;
    private Date modifiedDate;
    private boolean isDeleted;
    private UUID deletedBy;
    private Date deletedDate;
    private String role;
}
