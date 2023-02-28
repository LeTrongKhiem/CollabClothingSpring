package com.ecommerce.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import java.util.UUID;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseEntity extends AuditableEntity {
    @Id
    @Column(columnDefinition = "uniqueidentifier")
    @Getter
    @Setter
    private UUID id;
}
