package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.ICategoryService;
import com.ecommerce.Application.Abstractions.IFileStorageService;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Model.Categories.CategoryCreateModel;
import com.ecommerce.Model.Categories.CategoryModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.PagingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:4000/"})
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<PagingModel<CategoryModel>> getAll(@RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int pageSize,
                                                             @RequestParam(defaultValue = "") String search,
                                                             @RequestParam(defaultValue = "name") String sortBy,
                                                             @RequestParam(defaultValue = "asc") String sortDirection) {
        PagingRequest request = new PagingRequest(page, pageSize, sortBy, sortDirection, search);
        try {
            var result = categoryService.getAll(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    @StaffRole
    public ResponseEntity<Boolean> addCategory(@RequestBody CategoryCreateModel model) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            var result = categoryService.addCategory(userId, model);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{categoryId}")
    @StaffRole
    public ResponseEntity<Boolean> updateCategory(@PathVariable UUID categoryId, @RequestBody CategoryCreateModel model) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            var result = categoryService.updateCategory(categoryId, userId, model);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/delete/{categoryId}")
    @StaffRole
    public ResponseEntity<Boolean> deleteCategory(@PathVariable UUID categoryId) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            var result = categoryService.deleteCategory(categoryId, userId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryModel> getCategory(@PathVariable UUID categoryId) {
        try {
            var result = categoryService.getCategory(categoryId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
