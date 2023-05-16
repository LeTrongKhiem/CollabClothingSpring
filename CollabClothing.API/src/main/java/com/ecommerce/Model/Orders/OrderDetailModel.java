package com.ecommerce.Model.Orders;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class OrderDetailModel {
    private String productName;
    private int quantity;
    private double price;
    private String color;
    private String size;
    private UUID productId;
    private UUID orderId;
    private UUID sizeId;
    private UUID colorId;
}
