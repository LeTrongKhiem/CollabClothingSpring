package com.ecommerce.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.UUID;
@MappedSuperclass
@SuperBuilder
public abstract class DeletableEntity {
    @Getter
    @Setter
    protected Boolean isDeleted;
    @Nullable
    @Getter
    @Setter
    @Column(columnDefinition = "uniqueidentifier")
    protected UUID deletedBy;
    @Nullable
    @Getter
    @Setter
    protected Date dateDeleted;

    public DeletableEntity(Boolean isDeleted, UUID deletedBy, Date dateDeleted) {
        this.isDeleted = isDeleted;
        this.deletedBy = deletedBy;
        this.dateDeleted = dateDeleted;
    }

    public DeletableEntity() {
    }
}
