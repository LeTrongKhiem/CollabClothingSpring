package com.ecommerce.Model.Products;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class PartFileModel {
    MultipartFile file;
    String alt;
    boolean isThumbnail;
}
