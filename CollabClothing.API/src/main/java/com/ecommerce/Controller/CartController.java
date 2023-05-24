package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.ICartService;
import com.ecommerce.Application.PreAuthorizes.AdminOnly;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.PreAuthorizes.UserRole;
import com.ecommerce.Application.Service.CartService;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.SearchModel;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class CartController {
    @Autowired
    private ICartService cartService;

    @GetMapping("/getall")
    @StaffRole
    public ResponseEntity<PagingModel<OrderModel>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "shipName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType,
            @RequestParam(defaultValue = "0") int status,
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

    @GetMapping("/getOrderHistory")
    @UserRole
    public ResponseEntity<PagingModel<OrderModel>> orderHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "shipName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType,
            @RequestParam(defaultValue = "0") int status,
            @RequestParam(defaultValue = "") String phone) {
        SearchModel searchProductItems = new SearchModel(search, page, pageSize, sortBy, sortType);
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            PagingModel<OrderModel> products = cartService.getAll(userId, searchProductItems, status, phone);
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
    public ResponseEntity<Boolean> createOrder(@Valid @RequestBody OrderModel orderModel, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        try {
            UUID userId = AuthenticateExtensions.getUserId();
            var resultCreate = cartService.createOrder(userId, orderModel);
            return new ResponseEntity<>(resultCreate, HttpStatus.OK);
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
    @StaffRole
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
