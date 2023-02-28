package com.ecommerce.SeedData;

import com.ecommerce.Entities.Brand;
import com.ecommerce.Model.Constants.BrandConstants;
import com.ecommerce.Repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SeedBrand implements CommandLineRunner {
    @Autowired
    BrandRepository brandRepository;
    @Override
    public void run(String... args) throws Exception {
        seedBrand();
    }

    public void seedBrand() {
        if (brandRepository.count() == 0) {
            List<Brand> brands = new ArrayList<>();
            Brand adidas = new Brand(BrandConstants.ADIDAS, null, null, BrandConstants.ADIDAS_SLUG);
            adidas.setId(BrandConstants.ADIDAS_ID);
            adidas.setIsDeleted(false);
            Brand nike = new Brand(BrandConstants.NIKE, null, null, BrandConstants.NIKE_SLUG);
            nike.setId(BrandConstants.NIKE_ID);
            nike.setIsDeleted(false);
            Brand puma = new Brand(BrandConstants.PUMA, null, null, BrandConstants.PUMA_SLUG);
            puma.setId(BrandConstants.PUMA_ID);
            puma.setIsDeleted(false);
            Brand champion = new Brand(BrandConstants.CHAMPION, null, null, BrandConstants.CHAMPION_SLUG);
            champion.setId(BrandConstants.CHAMPION_ID);
            champion.setIsDeleted(false);
            brands.add(adidas);
            brands.add(nike);
            brands.add(puma);
            brands.add(champion);
            brandRepository.saveAll(brands);
        }
    }
}
