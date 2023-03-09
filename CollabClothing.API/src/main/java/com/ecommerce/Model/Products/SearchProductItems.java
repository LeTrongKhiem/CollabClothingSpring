package com.ecommerce.Model.Products;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class SearchProductItems {
    private String keyword;
    private UUID brandId;
    private UUID categoryId;
    private int page;
    private int size;
    private String sortBy;
}
