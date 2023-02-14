package com.ecommerce.Service;

import com.ecommerce.Abstractions.IProductDAO;
import com.ecommerce.Abstractions.IProductService;
import com.ecommerce.Entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component
@Service
public class ProductService implements IProductService {
    private IProductDAO productDAO;

    public ProductService(IProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @Override
    public boolean AddProduct(Product product) {
        return productDAO.AddProduct(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productDAO.getAllProducts();
    }
}
