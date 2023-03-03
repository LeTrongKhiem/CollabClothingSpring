package com.ecommerce.SeedData;

import com.ecommerce.Entities.Category;
import com.ecommerce.Model.Constants.CategoriesConstant;
import com.ecommerce.Model.Mapping.CategoryMapping;
import com.ecommerce.Repository.CategoryRepository;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SeedCategory implements CommandLineRunner {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public void run(String... args) throws Exception {
        seedCategory();
    }

    public void seedCategory() {
        if (categoryRepository.count() == 0) {
            Category men = CategoryMapping.mapToCategoryModel(CategoriesConstant.MEN_ID, CategoriesConstant.MEN,
                    null, "no-image", 1
            , true, CategoriesConstant.MEN_SLUG, 1);
            Category woman = CategoryMapping.mapToCategoryModel(CategoriesConstant.WOMEN_ID, CategoriesConstant.WOMEN,
                    null, "no-image", 1
                    , true, CategoriesConstant.WOMEN_SLUG, 2);
            Category kids = CategoryMapping.mapToCategoryModel(CategoriesConstant.KIDS_ID, CategoriesConstant.KIDS,
                    null, "no-image", 1
                    , true, CategoriesConstant.KIDS_SLUG, 3);
            Category shoes = CategoryMapping.mapToCategoryModel(CategoriesConstant.SHOES_ID, CategoriesConstant.SHOES,
                    null, "no-image", 1
                    , true, CategoriesConstant.SHOES_SLUG, 4);
            Category sports = CategoryMapping.mapToCategoryModel(CategoriesConstant.SPORTS_ID, CategoriesConstant.SPORTS,
                    null, "no-image", 1
                    , true, CategoriesConstant.SPORTS_SLUG, 5);
            Category clock = CategoryMapping.mapToCategoryModel(CategoriesConstant.CLOCK_ID, CategoriesConstant.CLOCK,
                    null, "no-image", 1
                    , true, CategoriesConstant.CLOCK_SLUG, 6);
            Category discharge = CategoryMapping.mapToCategoryModel(CategoriesConstant.DISCHARGE_ID, CategoriesConstant.DISCHARGE,
                    null, "no-image", 1
                    , true, CategoriesConstant.DISCHARGE_SLUG, 7);
            Category accessories = CategoryMapping.mapToCategoryModel(CategoriesConstant.ACCESSORIES_ID, CategoriesConstant.ACCESSORIES,
                    null, "no-image", 1
                    , true, CategoriesConstant.ACCESSORIES_SLUG, 8);

            List<Category> categories = Arrays.asList(men, woman, kids, shoes, sports, clock, discharge, accessories);
            categoryRepository.saveAll(categories);
        }
    }
}
