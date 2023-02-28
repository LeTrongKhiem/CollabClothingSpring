package com.ecommerce.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.LastModifiedBy;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "warehouses")
//@Where(clause = "is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WareHouse extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Column(columnDefinition = "uniqueidentifier")

    private UUID productId;
    private int quantity;
    @Column(columnDefinition = "uniqueidentifier")

    private UUID sizeId;
    @Column(columnDefinition = "uniqueidentifier")
    private UUID colorId;
}
