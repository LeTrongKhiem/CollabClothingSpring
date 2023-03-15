package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.ICategoryService;
import com.ecommerce.Application.Abstractions.IFileStorageService;
import com.ecommerce.Application.Extensions.PagedExtensions;
import com.ecommerce.Application.Extensions.SortExtensions;
import com.ecommerce.Application.Mappings.CategoryMapping;
import com.ecommerce.Entities.Category;
import com.ecommerce.Model.Categories.CategoryCreateModel;
import com.ecommerce.Model.Categories.CategoryModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.PagingRequest;
import com.ecommerce.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Component
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category findCategoryById(UUID id) {
        return categoryRepository.findById(id).get();
    }

    @Autowired
    IFileStorageService fileStorageService;

    private final Path categoryFile = Paths.get("upload_images/categories");

    @Override
    public PagingModel<CategoryModel> getAll(PagingRequest request) {
        Sort sort = null;
        if (request.getSortBy() != null && request.getSortDirection() != null)
            sort = SortExtensions.getSort(request.getSortBy(), request.getSortDirection());
        Pageable pageable = PageRequest.of(request.getPageIndex(), request.getPageSize(), sort);
        List<Category> categories = categoryRepository.findAll(sort);
        if (request.getSearch() != null)
            categories = categories.stream().filter(x -> x.getName().contains(request.getSearch())).toList();
        Page<Category> listCategoryPaging = PagedExtensions.getPage(pageable, categories);
        var result = CategoryMapping.mapToListCategory(listCategoryPaging.getContent());
        return PagedExtensions.getPagingModel(result, request.getPageIndex(), request.getPageSize());
    }

    @Override
    public boolean addCategory(UUID userId, CategoryCreateModel categoryModel) {
        Category category = CategoryMapping.mapCategoryFromModel(userId, categoryModel);
        if (categoryModel.getFile() != null) {
            String fileName = fileStorageService.saveFile(categoryModel.getFile(), categoryFile);
            category.setPathIcon(fileName);
            categoryRepository.save(category);
            return true;
        }
        category.setPathIcon("no-image");
        categoryRepository.save(category);
        return false;
    }

    @Override
    public boolean updateCategory(UUID categoryId, UUID userId, CategoryCreateModel categoryModel) {
        Category category = categoryRepository.findById(categoryId).get();
        if (category == null)
            throw new RuntimeException("Category not found");
        Category updateCategory = CategoryMapping.updateCategory(userId, category, categoryModel);
        if (categoryModel.getFile() != null) {
            fileStorageService.deleteFilePath(category.getPathIcon());
            String fileName = fileStorageService.saveFile(categoryModel.getFile(), categoryFile);
            updateCategory.setPathIcon(fileName);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(UUID id, UUID userId) {
        Category category = categoryRepository.findById(id).get();
        if (category == null)
            throw new RuntimeException("Category not found");
        category.setIsDeleted(true);
        category.setDeletedBy(userId);
        category.setDateDeleted(new java.util.Date(System.currentTimeMillis()));
        categoryRepository.save(category);
        return true;
    }

    @Override
    public List<Integer> getSortOrderByLevel(int level) {
        return null;
    }
}
