package com.ecommerce.Application.Extensions;

import org.springframework.data.domain.Sort;

public class SortExtensions {
    public static String getSortBy(String sortBy) {
        if (sortBy.equals("asc")) {
            return "asc";
        } else {
            return "desc";
        }
    }

    public static Sort getSort(String sortBy, String sortType) {
        if (sortType.equals("asc")) {
            return Sort.by(sortBy).ascending();
        } else {
            return Sort.by(sortBy).descending();
        }
    }
}
