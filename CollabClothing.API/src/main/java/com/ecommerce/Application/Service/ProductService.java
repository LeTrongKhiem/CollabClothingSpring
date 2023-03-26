package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.*;
import com.ecommerce.Application.Mappings.ProductImageMapping;
import com.ecommerce.Application.Mappings.ProductMapping;
import com.ecommerce.Entities.*;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.*;
import com.ecommerce.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

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
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private IFileStorageService fileStorageService;

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
        if (productModel != null) {
            addImage(userId, product.getId(), productModel.getImages());
        }
        return true;
    }

    @Override
    public ProductModel getProductById(UUID id) {
        return null;
    }

    @Override
    public boolean deleteProduct(UUID id, UUID userId) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setIsDeleted(true);
        product.setDeletedBy(userId);
        product.setDateDeleted(new java.util.Date(System.currentTimeMillis()));
        productRepository.save(product);
        return true;
    }

    @Override
    public boolean updateProduct(UUID productId, UUID userId, ProductModel productModel) {
        Product product = productRepository.findById(productId).orElseThrow();
        ProductDetail productDetail = productDetailsRepository.findById(product.getProductDetail().getId()).orElseThrow();
        Brand brand = brandService.findById(product.getBrand().getId());
        Product productUpdate = ProductMapping.updateProduct(userId, brand, product, productDetail, productModel);
        productRepository.save(productUpdate);
        return true;
    }

    @Override
    public List<ProductModel> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ProductMapping.getListProduct(products);
    }

    @Override
    public List<ProductModel> findProductsIsDeletedFalse() {
        List<Product> products = productRepository.findAllByIsDeletedFalse();
        return ProductMapping.getListProduct(products);
    }

    @Override
    public void addImage(UUID createBy, UUID productId, List<PartFileModel> productImage) {
        Product product = productRepository.findById(productId).get();
        if (productImage == null) {
            return;
        }
        for (PartFileModel file : productImage) {
            String path = fileStorageService.saveImage(file.getFile());
            ProductImage image = ProductImageMapping.mapToProductImage(createBy, product, new ProductImageModel(), path, file.isThumbnail());
            productImageRepository.save(image);
        }
    }

    @Override
    public List<ImageModel> getImages(UUID productId) {
        List<ProductImage> images = productImageRepository.findAllByProductId(productId);
        return ProductImageMapping.mapToImageModel(images);
    }

    @Override
    public ImageModel getImage(UUID imageId) {
        ProductImage image = productImageRepository.findById(imageId).get();
        return ProductImageMapping.mapToImageModel(image);
    }

    @Override
    public PagingModel<ImageModel> getImages(UUID productId, int pageIndex, int size) {
        Pageable pageable = PageRequest.of(pageIndex, size);
        List<ProductImage> images = productImageRepository.findAll();
        List<ProductImage> imagesByProductId = productImageRepository.findAllByProductId(productId);
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), imagesByProductId.size());
        final Page<ProductImage> page = new PageImpl<>(imagesByProductId.subList(start, end), pageable, imagesByProductId.size());
        var result = ProductImageMapping.mapToImageModel(page.getContent());
        int totalPage = (int) Math.ceil((double) imagesByProductId.size() / size);
        int totalItem = imagesByProductId.size();
        return new PagingModel<>(result, size, totalItem, pageIndex, totalPage);
    }

    @Override
    public PagingModel<ProductModel> getAll(SearchProductItems items) {
        Sort sort;
        if (items.getSortType() != null && items.getSortType().equals("desc")) {
            sort =  Sort.by(Sort.Order.desc(items.getSortBy()));
        } else {
            sort =  Sort.by(Sort.Order.asc(items.getSortBy()));
        }
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);

        List<Product> listProducts = productRepository.findAll(sort);
        if (items.getBrandId() != null) {
            listProducts = listProducts.stream().filter(product -> product.getBrand().getId().equals(items.getBrandId())).toList();
        }
        if (items.getCategoryId() != null) {
            listProducts = listProducts.stream().filter(product -> product.getProductMapCategories().stream().anyMatch(productMapCategory -> productMapCategory.getCategory().getId().equals(items.getCategoryId()))).toList();
        }
        if (items.getKeyword() != null) {
            listProducts = listProducts.stream().filter(product ->
                            product.getName().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
                            product.getBrand().getName().toLowerCase().contains(items.getKeyword().toLowerCase()))
                    .toList();
        }
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), listProducts.size());
        final Page<Product> page = new PageImpl<>(listProducts.subList(start, end), pageable, listProducts.size());
        var result = ProductMapping.getListProduct(page.getContent());
        int totalPage = (int) Math.ceil((double) listProducts.size() / items.getSize());
        int totalItem = listProducts.size();
        return new PagingModel<>(result, items.getSize(), totalItem, items.getPage(), totalPage);
    }
}
