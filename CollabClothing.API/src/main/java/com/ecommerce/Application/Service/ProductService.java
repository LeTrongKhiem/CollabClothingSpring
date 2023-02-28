package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IProductService;
import com.ecommerce.Entities.Product;
import com.ecommerce.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component
@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product AddProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findProductsIsDeletedFalse() {
        return productRepository.findAllByIsDeletedFalse();
    }
}
