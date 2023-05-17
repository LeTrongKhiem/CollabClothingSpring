package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IWareHouseService;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.ProductModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.WareHouse.WareHouseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class WareHouseController {
    @Autowired
    private IWareHouseService wareHouseService;

    @GetMapping("/getQuantity/{productId}")
    public ResponseEntity<Integer> getQuantity(@PathVariable UUID productId, @RequestParam UUID colorId, @RequestParam UUID sizeId) {
        try {
            int result = wareHouseService.getQuantity(productId, colorId, sizeId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getall")
    @StaffRole
    public ResponseEntity<PagingModel<WareHouseModel>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType) {
        SearchProductItems searchProductItems = new SearchProductItems(null, null, null, page, pageSize, sortBy, sortType);
        try {
            PagingModel<WareHouseModel> products = wareHouseService.getAll(searchProductItems);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{wareHouseId}")
    @StaffRole
    public ResponseEntity<WareHouseModel> getWareHouse(@PathVariable UUID wareHouseId) {
        try {
            var result = wareHouseService.getWareHouse(wareHouseId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/create/{productId}")
    @StaffRole
    public ResponseEntity<Boolean> createWareHouse(@PathVariable UUID productId, @RequestBody WareHouseModel model) {
        var userId = AuthenticateExtensions.getUserId();
        try {
            boolean result = wareHouseService.wareHouse(productId, userId, model);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
