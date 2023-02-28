package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IBrandService;
import com.ecommerce.Application.Mappings.BrandMapping;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Model.Brands.BrandModel;
import com.ecommerce.Repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@Component
@Service
@RequiredArgsConstructor
public class BrandService implements IBrandService {
    @Autowired
    private final BrandRepository brandRepository;
    @Override
    public Brand save(UUID userId, BrandModel brand) {
        Brand brandToSave = BrandMapping.mapToBrandModelCreate(userId, brand);
        return brandRepository.save(brandToSave);
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
    public void deleteById(UUID id, UUID userId) {
        Brand brandToDelete = brandRepository.findById(id).get();
        if (brandToDelete != null) {
            brandToDelete.setIsDeleted(true);
            brandToDelete.setDateDeleted(new Date(System.currentTimeMillis()));
            brandToDelete.setDeletedBy(userId);
            brandRepository.save(brandToDelete);
        }
    }

    @Override
    public boolean updateBrand(UUID id, UUID userId, BrandModel model) {
        Brand brandToUpdate = brandRepository.findById(id).get();
        if (brandToUpdate != null) {
            Brand brandUpdated = BrandMapping.mapToBrandModelEdit(userId, brandToUpdate, model);
            brandRepository.save(brandUpdated);
            return true;
        }
        return false;
    }

    @Override
    public void softDeleteById(UUID id) {
        brandRepository.softDeleteById(id);
    }

    @Override
    public List<Brand> findAllByIsDeletedFalse() {
        return brandRepository.findAllByIsDeletedFalse();
    }
}
