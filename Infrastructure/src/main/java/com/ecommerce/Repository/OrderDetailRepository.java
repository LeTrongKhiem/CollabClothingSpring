package com.ecommerce.Repository;

import com.ecommerce.Entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, UUID> {
    List<OrderDetail> findAllByOrderId(UUID orderId);
}
