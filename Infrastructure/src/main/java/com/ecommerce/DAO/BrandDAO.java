package com.ecommerce.DAO;

import com.ecommerce.Abstractions.IBrandDAO;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Repository.BrandRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class BrandDAO implements IBrandDAO {

    private BrandRepository brandRepository;
    @Override
    public Brand save(Brand brand) {
        brandRepository.save(brand);
        return brand;
    }

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(UUID id) {
        return brandRepository.findById(id).get();
    }

    @Override
    public void deleteById(UUID id) {
        brandRepository.deleteById(id);
    }

    @Override
    public boolean updateBrand(Brand brand) {
        brandRepository.save(brand);
        return true;
    }
}
