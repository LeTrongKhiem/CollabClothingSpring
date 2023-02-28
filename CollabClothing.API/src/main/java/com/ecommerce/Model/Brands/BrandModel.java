package com.ecommerce.Model.Brands;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Getter
public class BrandModel {
    private UUID modifiedBy;
    private Date modifiedDate;
    @NotEmpty
    private String name;
    @Nullable
    private String description;
    @Nullable
    private String pathLogo;
}
