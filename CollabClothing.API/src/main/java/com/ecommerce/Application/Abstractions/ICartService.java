package com.ecommerce.Application.Abstractions;

import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.SearchModel;

import java.util.List;
import java.util.UUID;

public interface ICartService {
    boolean createOrder(UUID userId, OrderModel orderModel);
    boolean updateOrder(UUID orderId, UUID userId, OrderModel orderModel);
    boolean changeStatusOrder(UUID orderId, UUID userId, int status);
    PagingModel<OrderModel> getAll(SearchModel items, int status, String phone);
    List<OrderDetailModel> getOrderDetail(UUID orderId);
    OrderModel getOrder(UUID orderId);
    PagingModel<OrderModel> getAll(UUID userId, SearchModel items, int status, String phone);
}
