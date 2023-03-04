package com.ecommerce.Application.Abstractions;

import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface ISendMailService {
    void sendMailVerification(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    void sendMail(User user, String siteURL, String subject, String content) throws MessagingException, UnsupportedEncodingException;
    void sendMailForgetPassword(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    void sendMailForgetPassword(User user, String siteURL, String token) throws MessagingException, UnsupportedEncodingException;
}
