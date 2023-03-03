package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IProductService;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Entities.Product;
import com.ecommerce.Model.Products.ProductModel;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product result = productService.AddProduct(product);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Product", "api/products/" + product.getId().toString());
        return new ResponseEntity<>(product, headers, HttpStatus.CREATED);
    }

    @PostMapping("/saveProduct")
    public ResponseEntity<Boolean> saveProduct(@Valid @RequestBody ProductModel model, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        var userId = AuthenticateExtensions.getUserId();
        boolean result = productService.save(userId, model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/active")
    public ResponseEntity<List<Product>> getAllActiveProducts() {
        try {
            List<Product> products = productService.findProductsIsDeletedFalse();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
