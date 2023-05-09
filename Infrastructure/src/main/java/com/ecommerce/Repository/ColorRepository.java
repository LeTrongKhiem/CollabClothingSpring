package com.ecommerce.Repository;

import com.ecommerce.Entities.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ColorRepository extends JpaRepository<Color, UUID> {
}
