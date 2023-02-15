package com.ecommerce;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServiceApplication {
    private static ConfigurableApplicationContext applicationContext;
    private final static Logger logger = LoggerFactory.getLogger(ServiceApplication.class);
    public static void main(String[] args) {
        ServiceApplication.applicationContext = SpringApplication.run(ServiceApplication.class, args);
    }
}
