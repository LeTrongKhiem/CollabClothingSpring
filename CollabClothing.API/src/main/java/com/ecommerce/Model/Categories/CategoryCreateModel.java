package com.ecommerce.Model.Categories;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Getter
@Setter
public class CategoryCreateModel {
    boolean isShowWeb;
    String name;
    int sortOrder;
    int level;
    UUID parentId;
}
