package com.ecommerce.Application.Extensions;

import com.ecommerce.Entities.Product;
import com.ecommerce.Model.PagingModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PagedExtensions {
    public static <T> PageImpl<T> getPage(Pageable pageable, List<T> list) {
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), list.size());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    public static <T> PagingModel<T> getPagingModel(List<T> list, int pageIndex, int pageSize) {
        int totalPage = (int) Math.ceil((double) list.size() / pageSize);
        int totalItem = list.size();
        return new PagingModel<>(list, pageSize, totalItem, pageIndex, totalPage);
    }
}
