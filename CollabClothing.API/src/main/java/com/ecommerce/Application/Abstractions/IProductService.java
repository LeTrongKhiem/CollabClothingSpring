package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Product;

import java.util.List;

public interface IProductService {
    Product AddProduct(Product product);
    List<Product> getAllProducts();
    List<Product> findProductsIsDeletedFalse();
}
