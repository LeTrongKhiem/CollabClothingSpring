package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.ICategoryService;
import com.ecommerce.Entities.Category;
import com.ecommerce.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Component
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category findCategoryById(UUID id) {
        return categoryRepository.findById(id).get();
    }
}
