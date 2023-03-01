package com.ecommerce.Model.Products;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductModel {
    private String name;
    private boolean sold_out;
    private UUID brand_id;
    private List<UUID> category_id;
    private int consumer;
    private int cotton;
}
