package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.ProductDetail;

public interface IProductDetailService {
    ProductDetail save(ProductDetail productDetail);
}
