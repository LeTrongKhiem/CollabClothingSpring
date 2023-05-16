package com.ecommerce.Model.Orders;

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
    private String shipName;
    private String shipAddress;
    private String shipEmail;
    private String shipPhoneNumber;
    private int status; //trang thai cua don hang
    private int paymentMethod; //phuong thuc thanh toan
    private double totalMoney;
    private List<OrderDetailModel> orderDetails;
}
