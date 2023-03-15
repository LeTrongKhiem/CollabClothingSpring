package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Extensions.SlugExtensions;
import com.ecommerce.Entities.Category;
import com.ecommerce.Model.Categories.CategoryCreateModel;
import com.ecommerce.Model.Categories.CategoryModel;

import java.util.Date;
import java.util.List;
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

    public static Category mapCategoryFromModel(UUID userId, CategoryCreateModel model) {
        UUID id = UUID.randomUUID();
        Category category = new Category();
        category.setId(id);
        category.setName(model.getName());
        category.setParentId(model.getParentId() != null ? model.getParentId() : null);
        category.setLevel(model.getLevel());
        category.setShowWeb(model.isShowWeb());
        category.setSlug(SlugExtensions.toSlug(model.getName()));
        category.setSortOrder(model.getSortOrder());
        category.setIsDeleted(false);
        category.setCreatedBy(userId);
        category.setCreatedDate(new Date(System.currentTimeMillis()));

        return category;
    }

    public static Category updateCategory(UUID userId, Category category, CategoryCreateModel model) {
        category.setName(model.getName());
        category.setParentId(model.getParentId());
        category.setLevel(model.getLevel());
        category.setShowWeb(model.isShowWeb());
        category.setSortOrder(model.getSortOrder());
        category.setModifiedBy(userId);
        category.setModifiedDate(new Date(System.currentTimeMillis()));

        return category;
    }

    public static CategoryModel mapCategory(Category category) {
        CategoryModel categoryModel = new CategoryModel();
        categoryModel.setId(category.getId());
        categoryModel.setName(category.getName());
        categoryModel.setParentId(category.getParentId());
        categoryModel.setPathIcon(category.getPathIcon());
        categoryModel.setLevel(category.getLevel());
        categoryModel.setShowWeb(category.isShowWeb());
        categoryModel.setSlug(category.getSlug());
        categoryModel.setSortOrder(category.getSortOrder());

        return categoryModel;
    }

    public static List<CategoryModel> mapToListCategory(List<Category> categories) {
        return categories.stream().map(CategoryMapping::mapCategory).toList();
    }
}
