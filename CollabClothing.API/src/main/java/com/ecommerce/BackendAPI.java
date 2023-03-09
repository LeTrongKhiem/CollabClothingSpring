package com.ecommerce;

import com.ecommerce.Application.Abstractions.IFileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendAPI {
    private final static Logger logger = LoggerFactory.getLogger(BackendAPI.class);

    public static void main(String[] args) {
        try {
            SpringApplication.run(BackendAPI.class, args);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage());
        }
    }
    @Bean
    CommandLineRunner init(IFileStorageService storageService) {
        return (args) -> {
            storageService.init();
        };
    }
}