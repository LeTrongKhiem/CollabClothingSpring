package com.ecommerce.ConfigSwagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import lombok.val;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;

@OpenAPIDefinition

@Configuration
public class SwaggerOpenApiConfig {
    /**
     * Definition: app.
     *
     * @return -
     */

    @Bean
    OpenAPI customOpenAPI() {

        val locUrl = "http://localhost:6868";

        // DOC. Property 'version'. Required by spec [https://editor.swagger.io/]

        val infoVersion = Instant.now().toString();

        val myapp = "CollabClothing";

        final String securitySchemeName = "bearerAuth";


        return new OpenAPI().addServersItem(new Server().url(locUrl))

                .info(new Info().version(infoVersion).title(myapp).description(

                        "WARNING: If having Swagger UI issues w/ Chrome then use Firefox instead."))//
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))

                .components(new Components().addSecuritySchemes(securitySchemeName, new SecurityScheme().name(securitySchemeName).type(

                        SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT").description(

                        "OAuth token in the scope collabclothing.api")));

    }
}