package com.ecommerce.Model.Products;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchProductItems {
    private String keyword;
    private UUID brandId;
    private UUID categoryId;
    private int page;
    private int size;
    private String sortBy;
    private String sortType;
}
