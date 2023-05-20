package com.ecommerce.Model.Orders;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class OrderModel {
    private UUID id;
    private Date created_date;
    private UUID created_by;
    private boolean is_deleted;
    private Date deleted_date;
    private UUID deleted_by;
    private Date orderDate;
    @NotEmpty(message = "Name is required")
    private String shipName;
    @NotEmpty(message = "Address is required")
    private String shipAddress;
    @NotEmpty(message = "Email is required")
    private String shipEmail;
    @NotEmpty(message = "Phone number is required")
    private String shipPhoneNumber;
    private int status; //trang thai cua don hang
    @NotNull(message = "Payment method is required")
    private int paymentMethod; //phuong thuc thanh toan
    private double totalMoney;
    private List<OrderDetailModel> orderDetails;
}
