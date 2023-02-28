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
import java.util.Set;

@Entity
@Table(name = "colors")
//@Where(clause = "is_deleted = false")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Color extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private String name;

    @OneToMany(mappedBy = "color")
    private Set<ProductMapColor> productMapColors;
}
