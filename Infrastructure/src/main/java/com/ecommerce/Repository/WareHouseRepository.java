package com.ecommerce.Repository;

import com.ecommerce.Entities.WareHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WareHouseRepository extends JpaRepository<WareHouse, UUID> {
    List<WareHouse> findAllByProductId(UUID productId);
}
