package com.ecommerce.Model.Products;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductImageModel {
//    private String alt;
//    private boolean isThumbnail;
    List<PartFileModel> files;
}
