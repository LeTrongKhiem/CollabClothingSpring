package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "products")
//@Where(clause = "is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    private boolean soldOut;
    private String slug;
    private Date dateCreated;
    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private ProductDetail productDetail;
    @OneToMany(mappedBy = "product")
    private Set<ProductMapCategory> productMapCategories;
    @OneToMany(mappedBy = "product")
    private Set<ProductMapColor> productMapColors;
    @OneToMany(mappedBy = "product")
    private Set<Promotion> promotions;
    @OneToMany(mappedBy = "product")
    private Set<ProductImage> productImages;
}
