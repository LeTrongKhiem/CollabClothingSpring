package com.ecommerce.Model.Mapping;

import com.ecommerce.Entities.Category;

import java.util.UUID;

public class CategoryMapping {
    public static Category mapToCategoryModel(UUID cateId, String name, UUID parentId, String pathIcon, int level, boolean isShowWeb, String slug, int sortOrder) {
        Category category = new Category();
        category.setId(cateId);
        category.setName(name);
        category.setParentId(parentId);
        category.setPathIcon(pathIcon);
        category.setLevel(level);
        category.setShowWeb(isShowWeb);
        category.setSlug(slug);
        category.setSortOrder(sortOrder);
        
        return category;
    }
}
