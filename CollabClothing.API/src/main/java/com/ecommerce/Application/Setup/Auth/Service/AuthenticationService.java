package com.ecommerce.Application.Setup.Auth.Service;

import com.ecommerce.Application.Abstractions.IRoleService;
import com.ecommerce.Application.Abstractions.ISendMailService;
import com.ecommerce.Application.Abstractions.IUserRoleService;
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
    @Autowired
    private final IUserRoleService userRoleService;

    //region Register
    public void register(RegisterRequest request, String siteUrl) {
        Optional<User> checkUser = userService.findByEmail(request.getEmail());
        if (checkUser.isPresent()) {
            throw new AppException(400, "User already exists");
        }
        Role role = roleService.findById(RoleConstants.USER_ID).get();
        User user = UserMapping.mapToUser(request, passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user);
        UserRole userRole = UserMapping.mapToRole(user, role);
        userRoleService.save(userRole);
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
        if (user.isBlock())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is blocked");
        if (user.getIsDeleted())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is deleted");
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    //endregion

    public Optional<UserModel> findByEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isEmpty()) {
            return Optional.empty();
        }
        User userThrow = user.orElseThrow();
        UserModel userModel = UserMapping.mapToUserModel(userThrow);
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
        User user = userService.getUserByEmail(email).orElseThrow();
        String token = RandomString.make(64);
        List<VerificationToken> verificationTokens = verificationService.findAllByUserOrderByExpiryDateDesc(user);
        VerificationToken checkTokenAvailable = verificationTokens.stream().findFirst().orElse(null);
        if (checkTokenAvailable != null && checkTokenAvailable.getExpiryDate().getTime() - new Date().getTime() > 0) {
            verificationService.deleteById(checkTokenAvailable.getId());
        }
        createPasswordResetTokenForUser(user, token);
        sendMailService.sendMailForgetPassword(user, siteUrl, token);
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
        changeUserPassword(verificationToken.getUser(), model.getNewPassword());
        return "Password changed successfully";
    }


    private void changeUserPassword(User user, String password) {
        if (password == null || password.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is empty");
        }
        if (user.isBlock() || user.getIsDeleted()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is blocked or deleted");
        }
        if (!user.isEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not enabled");
        }
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
