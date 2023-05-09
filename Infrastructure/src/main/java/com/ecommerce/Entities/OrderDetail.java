package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;
@Entity
@Table(name = "order_details")
@Getter
@Setter
public class OrderDetail implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid-gen")
    @Column(columnDefinition = "uniqueidentifier")
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    private UUID productId;
    private int quantity;
    private double price;
    private UUID colorId;
    private UUID sizeId;
}
