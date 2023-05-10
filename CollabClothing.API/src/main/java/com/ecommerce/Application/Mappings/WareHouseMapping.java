package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.Color;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.Size;
import com.ecommerce.Entities.WareHouse;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.WareHouse.WareHouseModel;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public class WareHouseMapping {
    public static WareHouse mapToWareHouseModel(UUID userId, UUID id, UUID productId, WareHouseModel model) {
        WareHouse wareHouse = new WareHouse();
        wareHouse.setId(id);
        wareHouse.setCreatedBy(userId);
        wareHouse.setCreatedDate(new Date(System.currentTimeMillis()));
        wareHouse.setIsDeleted(false);
        wareHouse.setColorId(model.getColorId());
        wareHouse.setSizeId(model.getSizeId());
        wareHouse.setQuantity(model.getQuantity());
        wareHouse.setProductId(productId);
        return wareHouse;
    }

    public static WareHouseModel mapWareHouse(WareHouse wareHouse) {
        WareHouseModel model = new WareHouseModel();
        model.setColorId(wareHouse.getColorId());
        model.setSizeId(wareHouse.getSizeId());
        model.setQuantity(wareHouse.getQuantity());
        return model;
    }

    public static WareHouseModel mapWareHouse(WareHouse wareHouse, Product product, Color color, Size size) {
        WareHouseModel model = new WareHouseModel();
        model.setColorId(wareHouse.getColorId());
        model.setSizeId(wareHouse.getSizeId());
        model.setQuantity(wareHouse.getQuantity());
        model.setProductName(product.getName());
        model.setColorName(color.getName());
        model.setSizeName(size.getName());
        return model;
    }

    public static List<WareHouseModel> getListProduct(List<WareHouse> products) {
        return products.stream().map(WareHouseMapping::mapWareHouse).toList();
    }
}
