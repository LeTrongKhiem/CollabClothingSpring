package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Category;

import java.util.UUID;

public interface ICategoryService {
    Category findCategoryById(UUID id);
}
