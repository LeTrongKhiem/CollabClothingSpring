package com.ecommerce.Model.WareHouse;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter

public class WareHouseModel {
    UUID colorId;
    UUID sizeId;
    int quantity;
    UUID productId;
    String productName;
    String colorName;
    String sizeName;
}
