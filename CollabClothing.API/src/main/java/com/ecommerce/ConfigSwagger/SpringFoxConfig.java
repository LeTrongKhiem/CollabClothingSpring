package com.ecommerce.ConfigSwagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
//@EnableSwagger2
//@EnableOpenApi
public class SpringFoxConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ecommerce"))
                .paths(PathSelectors.regex("/v1/.*"))
                .build().apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "CollabClothing Service API",
                "An application to manager website e-commerce for CollabClothing.",
                "CollabClothingApplication v1",
                "Terms of service",
                "letrongkhiem.it@gmail.com",
                "License of API",
                "https://swagger.io/docs/");
        return apiInfo;
    }
}