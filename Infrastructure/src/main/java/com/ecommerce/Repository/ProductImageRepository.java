package com.ecommerce.Repository;

import com.ecommerce.Entities.ProductImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    List<ProductImage> findAllByProductId(UUID productId);
    Page<ProductImage> findAllByProductId(UUID productId, Pageable pageable);
}
