package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Color;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.Size;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.*;


import java.util.List;
import java.util.UUID;

public interface IProductService {
    Product AddProduct(Product product);
    boolean save(UUID userId, ProductModel productModel);
    ProductModel getProductById(UUID id);
    boolean deleteProduct(UUID id, UUID userId);
    boolean updateProduct(UUID productId, UUID userId, ProductModel productModel);
    List<ProductModel> getAllProducts();
    List<ProductModel> findProductsIsDeletedFalse();
    void addImage(UUID createBy, UUID productId, List<PartFileModel> model);
    List<ImageModel> getImages(UUID productId);
    ImageModel getImage(UUID imageId);
    PagingModel<ImageModel> getImages(UUID productId, int page, int size);
    PagingModel<ProductModel> getAll(SearchProductItems items);
    boolean deleteImage(UUID imageId, UUID userId);
    List<Color> getAllColor();
    List<Size>  getAllSize();
}
