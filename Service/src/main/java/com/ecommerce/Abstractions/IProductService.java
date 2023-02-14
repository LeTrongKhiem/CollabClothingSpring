package com.ecommerce.Abstractions;

import com.ecommerce.Entities.Product;

import java.util.List;

public interface IProductService {
    boolean AddProduct(Product product);
    List<Product> getAllProducts();
}
