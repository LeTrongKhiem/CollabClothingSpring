package com.ecommerce.Repository;

import com.ecommerce.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}
