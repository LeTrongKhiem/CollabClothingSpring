package com.ecommerce.Application.Mappings;

import com.ecommerce.Entities.Order;
import com.ecommerce.Entities.OrderDetail;
import com.ecommerce.Entities.Product;
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
            orderDetail.setId(UUID.randomUUID());
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

    public static OrderDetailModel mapOrderDetail(OrderDetail orderDetail, Product product, String color, String size) {
        OrderDetailModel orderDetailModel = new OrderDetailModel();
        orderDetailModel.setProductName(product.getName());
        orderDetailModel.setPrice(product.getProductDetail().getPriceCurrent());
        orderDetailModel.setColor(color);
        orderDetailModel.setSize(size);
        orderDetailModel.setImage(product.getProductImages().stream().map(x -> x.getPath()).findFirst().get());
        orderDetailModel.setProductId(orderDetail.getProductId());
        orderDetailModel.setQuantity(orderDetail.getQuantity());
        orderDetailModel.setColorId(orderDetail.getColorId());
        orderDetailModel.setSizeId(orderDetail.getSizeId());
        return orderDetailModel;
    }

    public static List<OrderModel> mapListOrder(List<Order> orders) {
        return orders.stream().map(CartMapping::mapOrder).toList();
    }
}
