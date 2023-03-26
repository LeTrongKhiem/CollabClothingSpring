package com.ecommerce.Model.Constants;

import java.util.UUID;

public class RoleConstants {
    public static final String DEFAULT_ROLE = "GUEST";
    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
    public static final String GUEST = "GUEST";
    public static final String EMPLOYEE = "EMPLOYEE";

    public static final String ADMIN_DESCRIPTION = "Administrator";
    public static final String USER_DESCRIPTION = "User";
    public static final String GUEST_DESCRIPTION = "Guest";
    public static final String EMPLOYEE_DESCRIPTION = "Employee";

    public static final UUID ADMIN_ID = UUID.fromString("00000000-0000-0000-0000-000000000001");
    public static final UUID USER_ID = UUID.fromString("00000000-0000-0000-0000-000000000002");
    public static final UUID GUEST_ID = UUID.fromString("00000000-0000-0000-0000-000000000003");
    public static final UUID EMPLOYEE_ID = UUID.fromString("00000000-0000-0000-0000-000000000004");
}
