package com.ecommerce.Application.Setup.Auth.Service;

import com.ecommerce.Application.Abstractions.IRoleService;
import com.ecommerce.Application.Abstractions.ISendMailService;
import com.ecommerce.Application.Abstractions.IUserService;
import com.ecommerce.Application.Exceptions.AppException;
import com.ecommerce.Application.Mappings.UserMapping;
import com.ecommerce.Application.Mappings.VerificationMapping;
import com.ecommerce.Application.Service.VerificationService;
import com.ecommerce.Application.Setup.Auth.Model.AuthenticationRequest;
import com.ecommerce.Application.Setup.Auth.Model.AuthenticationResponse;
import com.ecommerce.Application.Setup.Auth.Model.ForgotPasswordModel;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.Role;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Entities.VerificationToken;
import com.ecommerce.Model.Constants.RoleConstants;
import com.ecommerce.Application.Setup.Config.JwtService;
import com.ecommerce.Model.GenericResponse;
import com.ecommerce.Model.UserModel;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final IRoleService roleService;
    @Autowired
    private final VerificationService verificationService;
    @Autowired
    private final ISendMailService sendMailService;

    //region Register
    public void register(RegisterRequest request, String siteUrl) {
        Optional<User> checkUser = userService.findByEmail(request.getEmail());
        if (checkUser.isPresent()) {
            throw new AppException(400, "User already exists");
        }
        User user = UserMapping.mapToUser(request, passwordEncoder.encode(request.getPassword()));
        user.setCreatedBy(user.getId());
        Role role = roleService.findById(RoleConstants.USER_ID).get();
        UserRole userRole = new UserRole(user, role);
        user.setUser_roles(new HashSet<UserRole>() {{
            add(userRole);
        }});
        userService.saveUser(user);
        String randomToken = RandomString.make(64);
        VerificationToken verificationToken = VerificationMapping.mapToVerificationToken(randomToken, user);
        verificationService.save(verificationToken);
        try {
            sendMailService.sendMailVerification(user, siteUrl);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    //endregion
    //region Authentication
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username or password");
        }
        var user = userService.findByEmail(request.getEmail()).orElseThrow();
        if (!user.isEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not enabled");
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    //endregion

    public Optional<UserModel> findByEmail(String email) {
        User user = userService.findByEmail(email).orElseThrow();
        UserModel userModel = UserMapping.mapToUserModel(user);
        return Optional.of(userModel);
    }

    //region Verify
    public boolean verify(String token) {
        VerificationToken verificationToken = verificationService.findByToken(token);
        if (verificationToken == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }
        User user = verificationToken.getUser();
        if (user == null || user.isEnabled())
            return false;
        Date now = new Date();
        if (verificationToken.getExpiryDate().getTime() - now.getTime() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
        }
        user.setEmailVerified(true);
        userService.saveUser(user);
        return true;
    }
    //endregion

    //region Forgot Password
    public void createPasswordResetTokenForUser(User user, String token) {
        VerificationToken myToken = new VerificationToken();
        myToken.setToken(token);
        myToken.setUser(user);
        myToken.setExpiryDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));
        verificationService.save(myToken);
    }

    public String resetPassword(String email, String siteUrl) throws MessagingException, UnsupportedEncodingException {
        User user = userService.findByEmail(email).orElseThrow();
        String token = RandomString.make(64);
        VerificationToken checkTokenAvailable = verificationService.findByUser(user);
        if (checkTokenAvailable != null && checkTokenAvailable.getExpiryDate().getTime() - new Date().getTime() > 0) {
            verificationService.deleteById(checkTokenAvailable.getId());
        }
        createPasswordResetTokenForUser(user, token);
        sendMailService.sendMailForgetPassword(user, siteUrl);
        return "Reset password link has been sent to your email";
    }

    public String savePassword(ForgotPasswordModel model) {
        String result = validatePasswordResetToken(model.getToken());
        if (result != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }
        VerificationToken verificationToken = verificationService.findByToken(model.getToken());
        User user = verificationToken.getUser();
        if (user == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        if (!passwordEncoder.matches(model.getOldPassword(), user.getPasswordHash()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Old password is incorrect");
        changeUserPassword(verificationToken.getUser(), model.getNewPassword());
        return "Password changed successfully";
    }


    private void changeUserPassword(User user, String password) {
        user.setPasswordHash(passwordEncoder.encode(password));
        userService.saveUser(user);
    }
    //endregion

    //region check token
    public String validatePasswordResetToken(String token) {
        final VerificationToken passToken = verificationService.findByToken(token);

        return !isTokenFound(passToken) ? "invalidToken"
                : isTokenExpired(passToken) ? "expired"
                : null;
    }

    private boolean isTokenFound(VerificationToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(VerificationToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }
    //endregion
}
