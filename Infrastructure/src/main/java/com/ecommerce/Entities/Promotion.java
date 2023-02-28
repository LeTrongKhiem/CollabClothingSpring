package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "promotions")
//@Where(clause = "is_deleted = false")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Promotion extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToOne(mappedBy = "promotion", cascade = CascadeType.ALL)
    private PromotionDetail promotionDetail;
}
