package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Extensions.SlugExtensions;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Model.Brands.BrandModel;

import java.util.Date;
import java.util.UUID;

public class BrandMapping {
    public static Brand mapToBrandModelCreate(UUID userId, BrandModel model) {
        Brand brand = new Brand();
        UUID id = UUID.randomUUID();
        brand.setId(id);
        brand.setName(model.getName());
        brand.setDescription(model.getDescription());
        brand.setPathLogo(model.getPathLogo());
        brand.setCreatedBy(userId);
        brand.setCreatedDate(new Date(System.currentTimeMillis()));
        brand.setSlug(SlugExtensions.toSlug(model.getName()));
        brand.setIsDeleted(false);
        return brand;
    }

    public static Brand mapToBrandModelEdit(UUID userId, Brand brand, BrandModel model) {
        brand.setName(model.getName());
        brand.setDescription(model.getDescription());
        brand.setPathLogo(model.getPathLogo());
        brand.setModifiedBy(userId);
        brand.setModifiedDate(new Date(System.currentTimeMillis()));
        brand.setSlug(SlugExtensions.toSlug(model.getName()));
        return brand;
    }
}
