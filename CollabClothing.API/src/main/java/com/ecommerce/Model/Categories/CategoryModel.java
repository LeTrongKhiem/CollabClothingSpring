package com.ecommerce.Model.Categories;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Getter
@Setter
public class CategoryModel {
    UUID id;
    boolean isShowWeb;
    String name;
    String slug;
    int sortOrder;
    int level;
    String pathIcon;
    UUID parentId;
}
