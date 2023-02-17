package com.ecommerce.Abstractions;

import com.ecommerce.Entities.Product;

import java.util.List;

public interface IProductService {
    Product AddProduct(Product product);
    List<Product> getAllProducts();
}
