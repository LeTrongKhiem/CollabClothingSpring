package com.ecommerce.Abstractions;

import com.ecommerce.Entities.Brand;

import java.util.List;
import java.util.UUID;

public interface IBrandDAO {
    Brand save(Brand brand);
    List<Brand> findAll();
    Brand findById(UUID id);
    void deleteById(UUID id);
    boolean updateBrand(Brand brand);
}
