package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IBrandService;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Entities.BaseEntity;
import com.ecommerce.Entities.Brand;
import com.ecommerce.Model.Brands.BrandModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class BrandController {
    @Autowired
    IBrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<List<Brand>> getAllBrands() {
        try {
            List<Brand> brands = brandService.findAll();
            return ResponseEntity.ok(brands);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/active")
    @StaffRole
    public ResponseEntity<List<Brand>> getAllActiveBrands() {
        try {
            List<Brand> brands = brandService.findAllByIsDeletedFalse();
            return ResponseEntity.ok(brands);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    @StaffRole
    public ResponseEntity<Brand> createBrand(@RequestBody BrandModel model) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            Brand brand = brandService.save(userId, model);
            return ResponseEntity.ok(brand);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")
    @StaffRole
    public ResponseEntity<Boolean> updateBrand(@PathVariable UUID id, @RequestBody BrandModel model) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            boolean result = brandService.updateBrand(id, userId, model);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/delete/{id}")
    @StaffRole
    public ResponseEntity<Boolean> deleteBrand(@PathVariable UUID id) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            brandService.deleteById(id, userId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable UUID id) {
        try {
            Brand brand = brandService.findById(id);
            return ResponseEntity.ok(brand);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
