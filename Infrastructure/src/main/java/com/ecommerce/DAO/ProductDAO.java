package com.ecommerce.DAO;

import com.ecommerce.Abstractions.IProductDAO;
import com.ecommerce.Entities.Product;
import com.ecommerce.Repository.ProductRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductDAO implements IProductDAO {
    private ProductRepository productRepository;
    @Override
    public boolean AddProduct(Product product) {
        productRepository.save(product);
        return false;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
