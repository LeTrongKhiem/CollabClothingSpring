package com.ecommerce.Model.Products;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductModel {
    @NotEmpty
    private String name;
    @NotNull
    private boolean sold_out;
    private UUID brand_id;
    private List<UUID> category_id;
    @NotNull
    private int consumer;
    @NotNull
    private int cotton;
    private String description;
    private String form;
    private String made_in;
    private double priceCurrent;
    private double priceOld;
    @NotNull
    private int sale_off;
    private String type;
}
