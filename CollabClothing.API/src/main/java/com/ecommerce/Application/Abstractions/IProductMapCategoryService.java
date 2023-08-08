package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Category;
import com.ecommerce.Entities.Product;



public interface IProductMapCategoryService {
    void save(Product product, Category category);
}
