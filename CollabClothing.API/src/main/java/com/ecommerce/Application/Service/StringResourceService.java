package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IStringResourceService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import static com.ecommerce.Application.Setup.Config.Translator.toLocale;

@Component
@Service
public class StringResourceService implements IStringResourceService {
    @Override
    public String getTranslation(String key) {
        return toLocale(key);
    }
}
