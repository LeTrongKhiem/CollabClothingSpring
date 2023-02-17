package com.ecommerce.SeedData;

import com.ecommerce.Entities.Role;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.Constants.RoleConstants;
import com.ecommerce.Repository.RoleRepository;
import com.ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class SeedUser implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        seedRole();
    }

    private void seedRole() {
        if (roleRepository.count() == 0) {
            Role admin = new Role(RoleConstants.ADMIN_ID, RoleConstants.ADMIN, RoleConstants.ADMIN_DESCRIPTION);
            Role user = new Role(RoleConstants.USER_ID, RoleConstants.USER, RoleConstants.USER_DESCRIPTION);
            Role guest = new Role(RoleConstants.GUEST_ID, RoleConstants.GUEST, RoleConstants.GUEST_DESCRIPTION);
            roleRepository.save(admin);
            roleRepository.save(user);
            roleRepository.save(guest);
        }
    }
}
