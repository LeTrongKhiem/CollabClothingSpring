package com.ecommerce.Application.Abstractions;

import com.ecommerce.Model.WareHouse.WareHouseModel;

import java.util.UUID;

public interface IWareHouseService {
    void wareHouse(UUID productId, UUID userId, WareHouseModel model);
    int getQuantity(UUID productId, UUID colorId, UUID sizeId);
}
