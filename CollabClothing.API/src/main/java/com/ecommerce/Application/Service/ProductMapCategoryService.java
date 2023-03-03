package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IProductMapCategoryService;
import com.ecommerce.Entities.Category;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductMapCategory;
import com.ecommerce.Repository.ProductMapCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductMapCategoryService implements IProductMapCategoryService {
    @Autowired
    private ProductMapCategoryRepository productMapCategoryRepository;
    @Override
    public void save(Product product, Category category) {
        UUID id = UUID.randomUUID();
        ProductMapCategory productMapCategory = new ProductMapCategory(id, product, category);
        productMapCategoryRepository.save(productMapCategory);
    }
}
