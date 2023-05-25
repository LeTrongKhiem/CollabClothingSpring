package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.ICartService;
import com.ecommerce.Application.Mappings.CartMapping;
import com.ecommerce.Application.Mappings.ProductMapping;
import com.ecommerce.Entities.Order;
import com.ecommerce.Entities.OrderDetail;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.User;
import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.SearchModel;
import com.ecommerce.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Component
public class CartService implements ICartService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public boolean createOrder(UUID userId, OrderModel orderModel) {
        double totalPrice = 0;
        for (OrderDetailModel model : orderModel.getOrderDetails()) {
            Optional<Product> product = productRepository.findById(model.getProductId());
            if (product.isEmpty()) {
                throw new NotFoundException("Product not found");
            }
            totalPrice += product.get().getProductDetail().getPriceCurrent() * model.getQuantity();
        }
        Order order = CartMapping.mapOrderModel(orderModel, userId, 1, totalPrice);
        List<OrderDetail> orderDetail = CartMapping.mapOrderDetailModel(orderModel.getOrderDetails(), order);
        if (orderDetail != null) {
            orderRepository.save(order);
            orderDetailRepository.saveAll(orderDetail);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateOrder(UUID orderId, UUID userId, OrderModel orderModel) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        if (orderModel != null) {
            order.get().setShipName(orderModel.getShipName());
            order.get().setShipAddress(orderModel.getShipAddress());
            order.get().setShipEmail(orderModel.getShipEmail());
            order.get().setShipPhoneNumber(orderModel.getShipPhoneNumber());
            order.get().setPaymentMethod(orderModel.getPaymentMethod());
            order.get().setStatus(2);
            order.get().setModifiedBy(userId);
            order.get().setModifiedDate(new Date(System.currentTimeMillis()));
            orderRepository.save(order.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean changeStatusOrder(UUID orderId, UUID userId, int status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        if (status != 0) {
            order.get().setStatus(status);
            order.get().setModifiedBy(userId);
            order.get().setModifiedDate(new Date(System.currentTimeMillis()));
            orderRepository.save(order.get());
            return true;
        }
        return false;
    }

    @Override
    public PagingModel<OrderModel> getAll(SearchModel items, int status, String phone) {
        Sort sort = getPageable(items);
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);
        List<Order> listProducts = orderRepository.findAll(sort);
        if (!phone.isEmpty()) {
            listProducts = listProducts.stream().filter(product -> product.getShipPhoneNumber().equals(phone)).toList();
        }
        if (status != 0) {
            listProducts = listProducts.stream().filter(product -> product.getStatus() == status).toList();
        }
        if (!items.getKeyword().isEmpty()) {
            listProducts = listProducts.stream().filter(product ->
                            product.getShipAddress().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
                                    product.getShipEmail().toLowerCase().contains(items.getKeyword().toLowerCase()))
                    .toList();
        }
        return pagingOrderModel(listProducts, items, pageable);
    }

    @Override
    public PagingModel<OrderModel> getAll(UUID userId, SearchModel items, int status, String phone) {
        Sort sort = getPageable(items);
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);
        List<Order> listProducts = orderRepository.findAll(sort);
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NotFoundException("User not found");
        }
        listProducts = listProducts.stream().filter(product -> product.getCreatedBy().equals(userId)).toList();
        if (!phone.isEmpty()) {
            listProducts = listProducts.stream().filter(product -> product.getShipPhoneNumber().equals(phone)).toList();
        }
        if (status != 0) {
            listProducts = listProducts.stream().filter(product -> product.getStatus() == status).toList();
        }
        if (!items.getKeyword().isEmpty()) {
            listProducts = listProducts.stream().filter(product ->
                            product.getShipAddress().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
                                    product.getShipEmail().toLowerCase().contains(items.getKeyword().toLowerCase()))
                    .toList();
        }
        return pagingOrderModel(listProducts, items, pageable);
    }

    private Sort getPageable(SearchModel items) {
        Sort sort;
        if (items.getSortType() != null && items.getSortType().equals("desc")) {
            sort =  Sort.by(Sort.Order.desc(items.getSortBy()));
        } else {
            sort =  Sort.by(Sort.Order.asc(items.getSortBy()));
        }
        return sort;
    }

    private PagingModel<OrderModel> pagingOrderModel(List<Order> orders, SearchModel items, Pageable pageable) {
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), orders.size());
        final Page<Order> page = new PageImpl<>(orders.subList(start, end), pageable, orders.size());
        var result = CartMapping.mapListOrder(page.getContent());
        int totalPage = (int) Math.ceil((double) orders.size() / items.getSize());
        int totalItem = orders.size();
        return new PagingModel<>(result, items.getSize(), totalItem, items.getPage(), totalPage);
    }

    @Override
    public List<OrderDetailModel> getOrderDetail(UUID orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(orderId);
        List<OrderDetailModel> orderDetailModels = new ArrayList<>();
        if (!order.isPresent()) {
            return null;
        }
        for (OrderDetail orderDetail : orderDetails) {
            Product product = productRepository.findById(orderDetail.getProductId()).orElseThrow();
            String size = sizeRepository.findById(orderDetail.getSizeId()).get().getName();
            String color = colorRepository.findById(orderDetail.getColorId()).get().getName();
            OrderDetailModel orderDetailModel = CartMapping.mapOrderDetail(orderDetail, product, color, size);
            orderDetailModels.add(orderDetailModel);
        }
        return orderDetailModels;
    }

    @Override
    public OrderModel getOrder(UUID orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            return null;
        }
        return CartMapping.mapOrder(order.get());
    }
}
