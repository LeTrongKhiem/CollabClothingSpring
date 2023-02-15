package com.ecommerce;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BackendAPI {
    private static ConfigurableApplicationContext applicationContext;
    private final static Logger logger = LoggerFactory.getLogger(BackendAPI.class);
    public static void main(String[] args) {
        BackendAPI.applicationContext = SpringApplication.run(BackendAPI.class, args);
    }
}