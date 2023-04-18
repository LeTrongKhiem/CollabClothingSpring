package com.ecommerce.SeedData;

import com.ecommerce.Entities.Color;
import com.ecommerce.Entities.Size;
import com.ecommerce.Repository.ColorRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class SeedColor implements CommandLineRunner {
    @Autowired
    private ColorRepository colorRepository;
    private final String filePath = "/Data/Color.json";

    @Override
    public void run(String... args) throws Exception {
        seedColor();
    }

    private void seedColor() {
        if (colorRepository.count() == 0) {
            try {
                TypeReference<List<Size>> typeReference = new TypeReference<List<Size>>() {
                };
                InputStream inputStream = TypeReference.class.getResourceAsStream(filePath);
                List<Size> colors = new ObjectMapper().readValue(inputStream, typeReference);
                if (colors != null && !colors.isEmpty()) {
                    List<Color> savedColors = new ArrayList<>();
                    colors.forEach(color -> savedColors.add(new Color(color.getId(), color.getName(), color.getIsDeleted())));
                    colorRepository.saveAll(savedColors);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
