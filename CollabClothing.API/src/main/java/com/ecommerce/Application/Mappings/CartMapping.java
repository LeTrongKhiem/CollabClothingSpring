package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.Order;
import com.ecommerce.Entities.OrderDetail;
import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CartMapping {
    public static Order mapOrderModel(OrderModel orderModel, UUID userId, int status, double totalPrice) {
        Order order = new Order();
        order.setShipAddress(orderModel.getShipAddress());
        order.setShipName(orderModel.getShipName());
        order.setShipEmail(orderModel.getShipEmail());
        order.setShipPhoneNumber(orderModel.getShipPhoneNumber());
        order.setOrderDate(new Date(System.currentTimeMillis()));
        order.setPaymentMethod(orderModel.getPaymentMethod());
        order.setCreatedBy(userId);
        order.setCreatedDate(new Date(System.currentTimeMillis()));
        order.setIsDeleted(false);
        order.setStatus(status);
        order.setId(UUID.randomUUID());
        order.setTotalMoney(totalPrice);
        return order;
    }

    public static List<OrderDetail> mapOrderDetailModel(List<OrderDetailModel> orderDetailModel, Order order) {
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailModel model : orderDetailModel) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProductId(model.getProductId());
            orderDetail.setQuantity(model.getQuantity());
            orderDetail.setColorId(model.getColorId());
            orderDetail.setSizeId(model.getSizeId());
            orderDetails.add(orderDetail);
        }
        return orderDetails;
    }

    public static OrderModel mapOrder(Order order) {
        OrderModel orderModel = new OrderModel();
        orderModel.setShipAddress(order.getShipAddress());
        orderModel.setShipName(order.getShipName());
        orderModel.setShipEmail(order.getShipEmail());
        orderModel.setShipPhoneNumber(order.getShipPhoneNumber());
        orderModel.setOrderDate(order.getOrderDate());
        orderModel.setPaymentMethod(order.getPaymentMethod());
        orderModel.setCreated_by(order.getCreatedBy());
        orderModel.setCreated_date(order.getCreatedDate());
        orderModel.set_deleted(order.getIsDeleted());
        orderModel.setStatus(order.getStatus());
        orderModel.setId(order.getId());
        orderModel.setTotalMoney(order.getTotalMoney());
        return orderModel;
    }

    public static List<OrderDetailModel> mapOrderDetail(List<OrderDetail> orderDetail) {
        List<OrderDetailModel> orderDetailModels = null;
        for (OrderDetail detail : orderDetail) {
            OrderDetailModel orderDetailModel = new OrderDetailModel();
            orderDetailModel.setProductId(detail.getProductId());
            orderDetailModel.setQuantity(detail.getQuantity());
            orderDetailModels.add(orderDetailModel);
        }
        return orderDetailModels;
    }

    public static List<OrderModel> mapListOrder(List<Order> orders) {
        return orders.stream().map(CartMapping::mapOrder).toList();
    }

//    public static List<OrderDetailModel> mapListOrderDetail(List<OrderDetail> orderDetails) {
//        return orderDetails.stream().map(CartMapping::mapOrderDetail).toList();
//    }
}
