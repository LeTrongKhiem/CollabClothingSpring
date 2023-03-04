package com.ecommerce.Application.Setup.Auth.Service;

import com.ecommerce.Application.Abstractions.ISendMailService;
import com.ecommerce.Application.Abstractions.IVerificationService;
import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.VerificationToken;
import com.ecommerce.Model.AppSettings;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
public class SendMailService implements ISendMailService {
    @Autowired
    private Environment environment;
    @Autowired
    private AppSettings appSettings;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private IVerificationService verificationService;

    @Override
    public void sendMailVerification(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = appSettings.getEmail();
        String senderName = appSettings.getCompany();
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "[[company]]";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName() + " " + user.getLastName());
        VerificationToken token = verificationService.findByUser(user);
        String verifyURL = siteURL + "verify?code=" + token.getToken();

        content = content.replace("[[URL]]", verifyURL);

        content = content.replace("[[company]]", appSettings.getCompany());

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void sendMail(User user, String siteURL, String subject, String content) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = appSettings.getEmail();
        String senderName = appSettings.getCompany();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void sendMailForgetPassword(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = appSettings.getEmail();
        String senderName = appSettings.getCompany();
        String subject = "Forgot Password";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify if you request forget password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">CHANGE PASSWORD</a></h3>"
                + "Thank you,<br>"
                + "[[company]]";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName() + " " + user.getLastName());
        VerificationToken token = verificationService.findByUser(user);
        String verifyURL = siteURL + "changePassword?code=" + token.getToken();

        content = content.replace("[[URL]]", verifyURL);

        content = content.replace("[[company]]", appSettings.getCompany());

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void sendMailForgetPassword(User user, String siteURL, String token) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = appSettings.getEmail();
        String senderName = appSettings.getCompany();
        String subject = "Forgot Password";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify if you request forget password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">CHANGE PASSWORD</a></h3>"
                + "Thank you,<br>"
                + "[[company]]";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName() + " " + user.getLastName());
        String verifyURL = siteURL + "changePassword?code=" + token;

        content = content.replace("[[URL]]", verifyURL);

        content = content.replace("[[company]]", appSettings.getCompany());

        helper.setText(content, true);

        mailSender.send(message);
    }
}
