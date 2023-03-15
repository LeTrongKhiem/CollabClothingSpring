package com.ecommerce.Application.Abstractions;

import com.ecommerce.Entities.Category;
import com.ecommerce.Model.Categories.CategoryCreateModel;
import com.ecommerce.Model.Categories.CategoryModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.PagingRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    Category findCategoryById(UUID id);
    PagingModel<CategoryModel> getAll(PagingRequest request);
    boolean addCategory(UUID userId, CategoryCreateModel categoryModel);
    boolean updateCategory(UUID categoryId, UUID userId, CategoryCreateModel categoryModel);
    boolean deleteCategory(UUID id, UUID userId);
    List<Integer> getSortOrderByLevel(int level);
}
