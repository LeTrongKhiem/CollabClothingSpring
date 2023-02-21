package com.ecommerce.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
public class AppSettings {
    @Value(value = "${appSettings.path}")
    private String path;
    @Value(value = "${spring.mail.username}")
    private String email;
    @Value(value = "${company.Name}")
    private String company;
}
