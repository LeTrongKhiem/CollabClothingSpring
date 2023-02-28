package com.ecommerce.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
//@Where(clause = "is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Date orderDate;
    private String shipName;
    private String shipAddress;
    private String shipEmail;
    private String shipPhoneNumber;
    private boolean status; //trang thai cua don hang
    private int paymentMethod; //phuong thuc thanh toan
    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetail;
}
