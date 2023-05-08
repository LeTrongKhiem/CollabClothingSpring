package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.WareHouse;
import com.ecommerce.Model.WareHouse.WareHouseModel;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public class WareHouseMapping {
    public static WareHouse mapToWareHouseModel(UUID userId, UUID id, WareHouseModel model) {
        WareHouse wareHouse = new WareHouse();
        wareHouse.setId(id);
        wareHouse.setCreatedBy(userId);
        wareHouse.setCreatedDate(new Date(System.currentTimeMillis()));
        wareHouse.setIsDeleted(false);
        wareHouse.setColorId(model.getColorId());
        wareHouse.setSizeId(model.getSizeId());
        wareHouse.setQuantity(model.getQuantity());
        return wareHouse;
    }
}
