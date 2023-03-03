package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Product;
import com.ecommerce.Model.Products.ProductModel;

import java.util.List;
import java.util.UUID;

public interface IProductService {
    Product AddProduct(Product product);
    boolean save(UUID userId, ProductModel productModel);
    ProductModel getProductById(UUID id);
    List<ProductModel> getAllProductModel();
    List<ProductModel> getProductByBrandId(UUID id);
    List<ProductModel> getProductByCategoryId(UUID id);
    boolean deleteProduct(UUID id);
    boolean updateProduct(ProductModel productModel);
    List<Product> getAllProducts();
    List<Product> findProductsIsDeletedFalse();
}
