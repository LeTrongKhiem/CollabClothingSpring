package com.ecommerce.Application.Abstractions;

import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.WareHouse.WareHouseModel;

import java.util.List;
import java.util.UUID;

public interface IWareHouseService {
    boolean wareHouse(UUID productId, UUID userId, WareHouseModel model);
    int getQuantity(UUID productId, UUID colorId, UUID sizeId);
    PagingModel<WareHouseModel> getAll(SearchProductItems items);
    WareHouseModel getWareHouse(UUID wareHouseId);
}
