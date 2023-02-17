package com.ecommerce;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
//@ComponentScan({"com.ecommerce.*"})
@EnableJpaRepositories("com.ecommerce.Repository")
//@EnableAutoConfiguration
public class BackendAPI {
    private final static Logger logger = LoggerFactory.getLogger(BackendAPI.class);

    public static void main(String[] args) {
        try {
            SpringApplication.run(BackendAPI.class, args);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage());
        }
    }

}