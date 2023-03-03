package com.ecommerce.Repository;

import com.ecommerce.Entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetail, UUID> {
}
