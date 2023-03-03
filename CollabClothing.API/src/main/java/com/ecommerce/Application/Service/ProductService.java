package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IBrandService;
import com.ecommerce.Application.Abstractions.ICategoryService;
import com.ecommerce.Application.Abstractions.IProductMapCategoryService;
import com.ecommerce.Application.Abstractions.IProductService;
import com.ecommerce.Application.Mappings.ProductMapping;
import com.ecommerce.Entities.*;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Repository.CategoryRepository;
import com.ecommerce.Repository.ProductDetailsRepository;
import com.ecommerce.Repository.ProductMapCategoryRepository;
import com.ecommerce.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Component
@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    @Autowired
    private IBrandService brandService;
    @Autowired
    private IProductMapCategoryService productMapCategoryService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductMapCategoryRepository productMapCategoryRepository;

    @Override
    public Product AddProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean save(UUID userId, ProductModel productModel) {
        Brand brand = brandService.findById(productModel.getBrand_id());
        Product product = ProductMapping.mapToProductModel(productModel, brand, userId);
        ProductDetail productDetail = ProductMapping.mapToProductDetail(product, productModel);
        productRepository.save(product);
        productDetailsRepository.save(productDetail);
        for (UUID cateId : productModel.getCategory_id()) {
            UUID uuid = UUID.randomUUID();
            Category category = categoryRepository.findById(cateId).get();
            ProductMapCategory productMapCategory = new ProductMapCategory(uuid, product, category);
            productMapCategoryRepository.save(productMapCategory);
        }
        return true;
    }

    @Override
    public ProductModel getProductById(UUID id) {
        return null;
    }

    @Override
    public List<ProductModel> getAllProductModel() {
        return null;
    }

    @Override
    public List<ProductModel> getProductByBrandId(UUID id) {
        return null;
    }

    @Override
    public List<ProductModel> getProductByCategoryId(UUID id) {
        return null;
    }

    @Override
    public boolean deleteProduct(UUID id) {
        return false;
    }

    @Override
    public boolean updateProduct(ProductModel productModel) {
        return false;
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
