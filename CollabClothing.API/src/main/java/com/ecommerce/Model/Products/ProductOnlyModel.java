package com.ecommerce.Model.Products;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductOnlyModel {
    private UUID id;
    private Date created_date;
    private Date updated_date;
    private UUID created_by;
    private UUID updated_by;
    private boolean is_deleted;
    @NotEmpty
    private String name;
    @NotNull
    private boolean sold_out;
    private UUID brand_id;
    private String slug;
    private String brandName;
    private List<UUID> category_id;
    private List<String> categoryNames;
}
