package com.ecommerce.Model.Products;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageModel {
    UUID id;
    Date createdDate;
    Date modifiedDate;
    UUID createdBy;
    UUID modifiedBy;
    String alt;
    boolean isDeleted;
    boolean isThumbnail;
    private String fileName;
    private String url;
}
