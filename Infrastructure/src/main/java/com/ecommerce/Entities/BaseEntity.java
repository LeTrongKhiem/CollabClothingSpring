package com.ecommerce.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseEntity extends AuditableEntity {
    @Id
    @Column(columnDefinition = "uniqueidentifier")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    public UUID getId() {
        return UUID.fromString(id.toString());
    }
    public void setId(UUID id) {
        this.id = id;
    }
}
