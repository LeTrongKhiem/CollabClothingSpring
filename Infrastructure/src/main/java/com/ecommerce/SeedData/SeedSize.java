package com.ecommerce.SeedData;

import com.ecommerce.Entities.Size;
import com.ecommerce.Repository.SizeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class SeedSize implements CommandLineRunner {
    @Autowired
    private SizeRepository sizeRepository;
    private final String filePath = "/Data/Size.json";

    @Override
    public void run(String... args) throws Exception {
        seedSize();
    }

    private void seedSize() {
        if (sizeRepository.count() == 0) {
            try {
                TypeReference<List<Size>> typeReference = new TypeReference<List<Size>>() {
                };
                InputStream inputStream = TypeReference.class.getResourceAsStream(filePath);
                List<Size> sizes = new ObjectMapper().readValue(inputStream, typeReference);
                if (sizes != null && !sizes.isEmpty()) {
                    List<Size> savedSizes = new ArrayList<>();
                    sizes.forEach(size -> savedSizes.add(new Size(size.getId(), size.getName(), size.getIsDeleted())));
                    sizeRepository.saveAll(savedSizes);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
