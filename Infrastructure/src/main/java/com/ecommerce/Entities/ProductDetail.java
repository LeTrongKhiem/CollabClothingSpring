package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "product_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(columnDefinition = "uniqueidentifier")
    private UUID id;
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(columnDefinition = "decimal(18,2)")
    private double priceCurrent;
    @Column(columnDefinition = "decimal(18,2)")
    private double priceOld;
    private int saleOff;
    @Length(max = 2000)
    private String description;
    private int consumer;
    private String type;
    private String form;
    private int cotton;
    private String madeIn;
}
