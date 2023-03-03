package com.ecommerce.Repository;
import com.ecommerce.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findAllByIsDeletedFalse();
    List<Product> findAllByBrandIdAndIsDeletedFalse(UUID id);
    @Query(value = "SELECT * FROM product join product_details on product.id = product_details.product_id WHERE id IN (SELECT product_id FROM product_category WHERE category_id = ?1)", nativeQuery = true)
    List<Product> findAllByCategory(UUID id);
}
