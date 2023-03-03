package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Extensions.SlugExtensions;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductDetail;
import com.ecommerce.Model.Products.ProductModel;

import java.util.Date;
import java.util.UUID;

public class ProductMapping {
    public static Product mapToProductModel(ProductModel model, Brand brand, UUID userId) {
        Product product = new Product();
        UUID id = UUID.randomUUID();
        product.setId(id);
        product.setName(model.getName());
        product.setSoldOut(model.isSold_out());
        product.setBrand(brand);
        product.setCreatedBy(userId);
        product.setCreatedDate(new Date(System.currentTimeMillis()));
        product.setIsDeleted(false);
        product.setSlug(SlugExtensions.toSlug(model.getName()));

        return product;
    }

    public static ProductDetail mapToProductDetail(Product product, ProductModel model) {
        ProductDetail productDetail = new ProductDetail();
        productDetail.setId(UUID.randomUUID());
        productDetail.setProduct(product);
        productDetail.setConsumer(model.getConsumer());
        productDetail.setCotton(model.getCotton());
        productDetail.setDescription(model.getDescription());
        productDetail.setForm(model.getForm());
        productDetail.setMadeIn(model.getMade_in());
        productDetail.setPriceCurrent(model.getPriceCurrent());
        productDetail.setPriceOld(model.getPriceOld());
        productDetail.setSaleOff(model.getSale_off());
        productDetail.setType(model.getType());
        productDetail.setProduct(product);

        return productDetail;
    }
}
