package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.ICategoryService;
import com.ecommerce.Application.Abstractions.IFileStorageService;
import com.ecommerce.Model.Categories.CategoryModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.PagingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;
    @Autowired
    IFileStorageService fileStorageService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<PagingModel<CategoryModel>> getAll( @RequestParam(defaultValue = "0") int page,
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
}
