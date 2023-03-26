package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Extensions.SlugExtensions;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductDetail;
import com.ecommerce.Model.Products.ProductDetailModel;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.Products.ProductOnlyModel;
import lombok.val;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public static ProductModel getProduct(Product product, ProductDetail productDetail) {
        ProductModel productModel = new ProductModel();
        productModel.setId(product.getId());
        productModel.setName(product.getName());
        productModel.setBrand_id(product.getBrand().getId());
        productModel.setBrandName(product.getBrand().getName());
        productModel.setConsumer(productDetail.getConsumer());
        productModel.setCotton(productDetail.getCotton());
        productModel.setDescription(productDetail.getDescription());
        productModel.setForm(productDetail.getForm());
        productModel.setMade_in(productDetail.getMadeIn());
        productModel.setPriceCurrent(productDetail.getPriceCurrent());
        productModel.setPriceOld(productDetail.getPriceOld());
        productModel.setSale_off(productDetail.getSaleOff());
        productModel.setType(productDetail.getType());
        productModel.setSold_out(product.isSoldOut());
        productModel.setCreated_date(product.getCreatedDate());
        productModel.setCreated_by(product.getCreatedBy());
        productModel.setUpdated_date(product.getModifiedDate());
        productModel.setUpdated_by(product.getModifiedBy());
        productModel.set_deleted(product.getIsDeleted());

        return productModel;
    }

    public static ProductModel getProduct(Product product) {
        ProductModel productModel = new ProductModel();
        ProductDetail productDetail = product.getProductDetail();
        if (productDetail == null) {
            productDetail = new ProductDetail();
        }
        productModel.setId(product.getId());
        productModel.setName(product.getName());
        productModel.setBrand_id(product.getBrand().getId());
        productModel.setBrandName(product.getBrand().getName());
        productModel.setConsumer(productDetail.getConsumer());
        productModel.setCotton(productDetail.getCotton());
        productModel.setDescription(productDetail.getDescription());
        productModel.setForm(productDetail.getForm());
        productModel.setMade_in(productDetail.getMadeIn());
        productModel.setPriceCurrent(productDetail.getPriceCurrent());
        productModel.setPriceOld(productDetail.getPriceOld());
        productModel.setSale_off(productDetail.getSaleOff());
        productModel.setType(productDetail.getType());
        productModel.setSold_out(product.isSoldOut());
        productModel.setCreated_date(product.getCreatedDate());
        productModel.setCreated_by(product.getCreatedBy());
        productModel.setUpdated_date(product.getModifiedDate());
        productModel.setUpdated_by(product.getModifiedBy());
        productModel.set_deleted(product.getIsDeleted());
        productModel.setCategory_id(new ArrayList<>(product.getProductMapCategories().stream().map(x -> x.getCategory().getId()).collect(Collectors.toList())));
        productModel.setCategoryNames(new ArrayList<>(product.getProductMapCategories().stream().map(x -> x.getCategory().getName()).collect(Collectors.toList())));

        return productModel;
    }

    public static Product updateProduct(UUID userId, Brand brand, Product product, ProductDetail productDetail, ProductModel productModel) {
        product.setName(productModel.getName());
        product.setSoldOut(productModel.isSold_out());
        product.setModifiedDate(new Date(System.currentTimeMillis()));
        product.setModifiedBy(userId);
        product.setSlug(SlugExtensions.toSlug(productModel.getName()));
        product.setBrand(brand);
        productDetail.setConsumer(productModel.getConsumer());
        productDetail.setCotton(productModel.getCotton());
        productDetail.setDescription(productModel.getDescription());
        productDetail.setForm(productModel.getForm());
        productDetail.setMadeIn(productModel.getMade_in());
        productDetail.setPriceCurrent(productModel.getPriceCurrent());
        productDetail.setPriceOld(productModel.getPriceOld());
        productDetail.setSaleOff(productModel.getSale_off());
        productDetail.setType(productModel.getType());
        product.setProductDetail(productDetail);
        return product;
    }

    public static ProductOnlyModel toProduct(Product product) {
        ProductOnlyModel productOnlyModel = new ProductOnlyModel();
        productOnlyModel.setId(product.getId());
        productOnlyModel.setName(product.getName());
        productOnlyModel.setBrand_id(product.getBrand().getId());
        productOnlyModel.setBrandName(product.getBrand().getName());
        productOnlyModel.setCreated_date(product.getCreatedDate());
        productOnlyModel.setCreated_by(product.getCreatedBy());
        productOnlyModel.setUpdated_date(product.getModifiedDate());
        productOnlyModel.setUpdated_by(product.getModifiedBy());
        productOnlyModel.set_deleted(product.getIsDeleted());

        return productOnlyModel;
    }

    public static ProductDetailModel toProductDetail(ProductDetail productDetail) {
        ProductDetailModel productDetailModel = new ProductDetailModel();
        productDetailModel.setId(productDetail.getId());
        productDetailModel.setConsumer(productDetail.getConsumer());
        productDetailModel.setCotton(productDetail.getCotton());
        productDetailModel.setDescription(productDetail.getDescription());
        productDetailModel.setForm(productDetail.getForm());
        productDetailModel.setMade_in(productDetail.getMadeIn());
        productDetailModel.setPriceCurrent(productDetail.getPriceCurrent());
        productDetailModel.setPriceOld(productDetail.getPriceOld());
        productDetailModel.setSale_off(productDetail.getSaleOff());
        productDetailModel.setType(productDetail.getType());

        return productDetailModel;
    }

    public static List<ProductModel> getListProduct(List<Product> products) {
        return products.stream().map(ProductMapping::getProduct).toList();
    }

    public static Page<ProductModel> getPageProducts(Page<Product> products) {
        return products.map(ProductMapping::getProduct);
    }

}
