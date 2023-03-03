package com.ecommerce.Repository;

import com.ecommerce.Entities.ProductMapCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductMapCategoryRepository extends JpaRepository<ProductMapCategory, UUID> {
}
