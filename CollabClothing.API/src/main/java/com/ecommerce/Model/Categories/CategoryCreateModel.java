package com.ecommerce.Model.Categories;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Getter
@Setter
public class CategoryCreateModel {
//    UUID id;
    boolean isShowWeb;
    String name;
    int sortOrder;
    int level;
//    String pathIcon;
    UUID parentId;
    MultipartFile file;
}
