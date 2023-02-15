package com.ecommerce.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.UUID;
@MappedSuperclass
@SuperBuilder
public abstract class AuditableEntity extends DeletableEntity {
    @Nullable
    @LastModifiedBy
    @Column(columnDefinition = "uniqueidentifier")
    @Getter
    @Setter
    protected UUID modifiedBy;
    @Nullable
    @LastModifiedDate
    @Getter
    @Setter
    protected Date modifiedDate;
    @Nullable
    @CreatedBy
    @Column(columnDefinition = "uniqueidentifier")
    @Getter
    @Setter
    protected UUID createdBy;
    @Nullable
    @CreatedDate
    @Getter
    @Setter
    protected Date createdDate;

    public AuditableEntity(UUID modifiedBy, Date modifiedDate, UUID createdBy, Date createdDate) {
        super();
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }

    public AuditableEntity() {
    }
}
