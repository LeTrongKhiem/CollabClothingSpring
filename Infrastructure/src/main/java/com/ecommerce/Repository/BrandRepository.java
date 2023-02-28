package com.ecommerce.Repository;

import com.ecommerce.Entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BrandRepository extends JpaRepository<Brand, UUID> {
    @Query("update Brand b set b.isDeleted = true where b.id = ?1")
    @Modifying
    void softDeleteById(UUID id);
    List<Brand> findAllByIsDeletedFalse();
}
