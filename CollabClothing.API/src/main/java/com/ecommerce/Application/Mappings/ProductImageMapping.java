package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductImage;
import com.ecommerce.Model.Products.ProductImageModel;

import java.util.Date;
import java.util.UUID;

public class ProductImageMapping {
    public static ProductImage mapToProductImage(UUID createBy, Product product, ProductImageModel model, String path) {
        ProductImage productImage = new ProductImage();
        UUID id = UUID.randomUUID();
        productImage.setId(id);
        productImage.setAlt(model.getAlt());
        productImage.setThumbnail(model.isThumbnail());
        productImage.setProduct(product);
        productImage.setCreatedBy(createBy);
        productImage.setCreatedDate(new Date(System.currentTimeMillis()));
        productImage.setIsDeleted(false);
        productImage.setPath(path);
        return productImage;
    }
}
