package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "promotion_details")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDetail implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid-gen")
    @Column(columnDefinition = "uniqueidentifier")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;

    private boolean onlinePromotion;
    private String info;
    private boolean more;
    private String name;
}
