package com.ecommerce;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@ComponentScan({"com.ecommerce"})
//@EntityScan("com.ecommerce.Entities")
//@EnableJpaRepositories("com.ecommerce.Repository")
public class ServiceApplication extends SpringBootServletInitializer {
    private static ConfigurableApplicationContext applicationContext;
    private final static Logger logger = LoggerFactory.getLogger(ServiceApplication.class);
    public static void main(String[] args) {
        ServiceApplication.applicationContext = SpringApplication.run(ServiceApplication.class, args);
    }
}
