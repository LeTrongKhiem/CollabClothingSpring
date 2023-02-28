package com.ecommerce.Repository;
import com.ecommerce.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findAllByIsDeletedFalse();

}
