package com.ecommerce.ConfigSwagger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration

@EnableWebSecurity
public class SwaggerSecurityConfig {
    /**

     * Springdoc v2.

     *

     * @param http

     * @return -

     */

    @Order(6)

    @Bean
    SecurityFilterChain filterChainSpringDocV2(HttpSecurity http) throws Exception {

        final String[] pathAnonymous = { "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**" };



        http// sb3

                .securityMatcher(pathAnonymous) // only invoke if matching

                .authorizeHttpRequests(authorize -> authorize//

                        .anyRequest().anonymous()//

                ) //

        ;



        http.csrf().disable();

        http.headers().frameOptions().disable();

        // DOC. Avoid generation of cookie JSESSIONID (Swagger)

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);



        return http.build();

    }
}