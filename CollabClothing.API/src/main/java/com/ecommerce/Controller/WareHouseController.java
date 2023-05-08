package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IWareHouseService;
import com.ecommerce.Model.WareHouse.WareHouseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class WareHouseController {
    @Autowired
    private IWareHouseService wareHouseService;

    @GetMapping("/{productId}")
    public int getQuantity(@PathVariable UUID productId, UUID colorId, UUID sizeId) {
        return wareHouseService.getQuantity(productId, colorId, sizeId);
    }
    @PostMapping("/{productId}")
    public void wareHouse(@PathVariable UUID productId, UUID userId, @RequestAttribute WareHouseModel model) {
        wareHouseService.wareHouse(productId, userId, model);
    }
}
