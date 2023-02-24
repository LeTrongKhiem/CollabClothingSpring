package com.ecommerce.Model;

import java.util.List;

public class PagingModel<T> {
    public List<T> results;
    public int ResultCount;
    public int PageSize;
    public int TotalCount;
    public int CurrentPage;
    public int TotalPages;
    public String Search;
}
