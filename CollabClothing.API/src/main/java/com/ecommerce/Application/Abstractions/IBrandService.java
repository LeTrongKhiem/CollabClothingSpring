package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Brand;
import com.ecommerce.Model.Brands.BrandModel;

import java.util.List;
import java.util.UUID;

public interface IBrandService {
    Brand save(UUID userId, BrandModel brand);
    List<Brand> findAll();
    Brand findById(UUID id);
    void deleteById(UUID id, UUID userId);
    boolean updateBrand(UUID id, UUID userId, BrandModel brand);
    void softDeleteById(UUID id);
    List<Brand> findAllByIsDeletedFalse();
}
