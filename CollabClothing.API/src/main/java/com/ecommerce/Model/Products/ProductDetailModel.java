package com.ecommerce.Model.Products;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProductDetailModel {
    private UUID id;
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
