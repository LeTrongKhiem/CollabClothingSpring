package com.ecommerce.Entities;


import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
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
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "categories")
//@Where(clause = "is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    @Column(columnDefinition = "uniqueidentifier")
    private UUID parentId;
    @Nullable
    private String pathIcon;
    private int level;
    private boolean isShowWeb;
    private String slug;
    @Column(nullable = true)
    private int sortOrder;
    @OneToMany(mappedBy = "category")
    private Set<ProductMapCategory> productMapCategories;
}
