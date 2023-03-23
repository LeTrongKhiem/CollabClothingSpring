package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Extensions.DateTimeExtensions;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductImage;
import com.ecommerce.Model.Products.ImageModel;
import com.ecommerce.Model.Products.ProductImageModel;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class ProductImageMapping {
    public static ProductImage mapToProductImage(UUID createBy, Product product, ProductImageModel model, String path, boolean isThumbnail) {
        ProductImage productImage = new ProductImage();
        UUID id = UUID.randomUUID();
        productImage.setId(id);
        productImage.setAlt(product.getName());
        productImage.setThumbnail(isThumbnail);
        productImage.setProduct(product);
        productImage.setCreatedBy(createBy);
        productImage.setCreatedDate(new Date(System.currentTimeMillis()));
        productImage.setIsDeleted(false);
        productImage.setPath(path);
        return productImage;
    }

    public static ImageModel mapToImageModel(ProductImage productImage) {
        ImageModel imageModel = new ImageModel();
        imageModel.setId(productImage.getId());
        imageModel.setAlt(productImage.getAlt());
        imageModel.setCreatedDate(productImage.getCreatedDate());
        imageModel.setCreatedBy(productImage.getCreatedBy());
        imageModel.setFileName(productImage.getPath());
        imageModel.setDeleted(productImage.getIsDeleted());
        imageModel.setThumbnail(productImage.isThumbnail());
        imageModel.setModifiedBy(productImage.getModifiedBy());
        imageModel.setModifiedDate(productImage.getModifiedDate());
        imageModel.setUrl(productImage.getPath());
        return imageModel;
    }

    public static List<ImageModel> mapToImageModel(List<ProductImage> productImages) {
        return productImages.stream().map(ProductImageMapping::mapToImageModel).toList();
    }
}
