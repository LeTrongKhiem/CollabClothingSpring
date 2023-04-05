package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_map_category")
@Getter
@Setter
public class ProductMapCategory implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;
    @GeneratedValue(generator = "uuid-gen")
    @Getter
    @Setter
    @ManyToOne()
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @GeneratedValue(generator = "uuid-gen")
    @Getter
    @Setter
    @ManyToOne()
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
