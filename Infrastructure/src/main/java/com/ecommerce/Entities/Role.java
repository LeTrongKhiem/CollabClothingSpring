package com.ecommerce.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "roles")
public class Role implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @Getter
    @Setter
    @Column(columnDefinition = "uniqueidentifier")
    private UUID id;
    @Getter
    @Setter
    @Column(nullable = false)
    private String name;
    @Getter
    @Setter
    @Nullable
    private String description;
    @Getter
    @Setter
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<UserRole> user_roles = new HashSet<>(0);

    public Role() {
    }

    public Role(UUID id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
