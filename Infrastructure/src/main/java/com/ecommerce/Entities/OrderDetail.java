package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;
@Entity
@Table(name = "order_details")
@Getter
@Setter
public class OrderDetail implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @Column(columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @Column(columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID productId;
    private int quantity;
    @Column(columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID colorId;
    @Column(columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID sizeId;
}
