package com.ecommerce.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PagingRequest {
    private int pageIndex;
    private int pageSize;
    private String sortBy;
    private String sortDirection;
    private String search;
}
