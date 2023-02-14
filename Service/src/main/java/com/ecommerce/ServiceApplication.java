package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
//@Configuration
//@EnableWebSecurity
//@EnableSwagger2
public class ServiceApplication {
    private static ConfigurableApplicationContext applicationContext;
    public static void main(String[] args) {
        ServiceApplication.applicationContext = SpringApplication.run(ServiceApplication.class, args);
    }
}
