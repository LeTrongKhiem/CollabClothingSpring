package com.ecommerce.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class AppSettings {
    @Value(value = "${appSettings.path}")
    private String path;
}
