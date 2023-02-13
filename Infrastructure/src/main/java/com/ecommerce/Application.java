package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"com.ecommerce.Entities"})
public class Application {
    private static ConfigurableApplicationContext applicationContext;
    public static void main(String[] args) {
        Application.applicationContext = SpringApplication.run(Application.class, args);
    }
}
