package com.ecommerce.Controller;

import com.ecommerce.Application.Service.CartService;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/getall")
    public ResponseEntity<PagingModel<OrderModel>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType,
            @RequestParam(defaultValue = "") int status,
            @RequestParam(defaultValue = "") String phone) {
        SearchModel searchProductItems = new SearchModel(search, page, pageSize, sortBy, sortType);
        try {
            PagingModel<OrderModel> products = cartService.getAll(searchProductItems, status, phone);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getorderdetail/{orderId}")
    public ResponseEntity<List<OrderDetailModel>> getOrderDetail(@PathVariable UUID orderId) {
        try {
            return new ResponseEntity<>(cartService.getOrderDetail(orderId), HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createorder")
    public ResponseEntity<Boolean> createOrder(@RequestBody OrderModel orderModel, @RequestBody List<OrderDetailModel> orderDetailModel) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            return new ResponseEntity<>(cartService.createOrder(userId, orderModel, orderDetailModel), HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getorder/{orderId}")
    public ResponseEntity<OrderModel> getOrder(@PathVariable UUID orderId) {
        try {
            return new ResponseEntity<>(cartService.getOrder(orderId), HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateorder/{orderId}")
    public ResponseEntity<Boolean> updateOrder(@PathVariable UUID orderId, @RequestBody OrderModel orderModel) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            return new ResponseEntity<>(cartService.updateOrder(orderId, userId, orderModel), HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/changestatusorder/{orderId}")
    public ResponseEntity<Boolean> changeStatusOrder(@PathVariable UUID orderId, @RequestBody int status) {
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            return new ResponseEntity<>(cartService.changeStatusOrder(orderId, userId, status), HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
