package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IProductDetailService;
import com.ecommerce.Entities.ProductDetail;
import com.ecommerce.Repository.ProductDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class ProductDetailService implements IProductDetailService {
    @Autowired
    ProductDetailsRepository productDetailsRepository;
    @Override
    public ProductDetail save(ProductDetail productDetail) {
        return productDetailsRepository.save(productDetail);
    }
}
