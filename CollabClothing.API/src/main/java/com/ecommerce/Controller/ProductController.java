package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IFileStorageService;
import com.ecommerce.Application.Abstractions.IProductService;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductImage;
import com.ecommerce.Model.Products.ImageModel;
import com.ecommerce.Model.Products.ProductImageModel;
import com.ecommerce.Model.Products.ProductModel;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    IProductService productService;
    @Autowired
    IFileStorageService fileStorageService;

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
    public ResponseEntity<List<ProductModel>> getAllProducts() {
        try {
            List<ProductModel> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/active")
    public ResponseEntity<List<ProductModel>> getAllActiveProducts() {
        try {
            List<ProductModel> products = productService.findProductsIsDeletedFalse();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("image/upload")
    public ResponseEntity<String> uploadImage(@RequestParam UUID productId, @ModelAttribute ProductImageModel model) {
        UUID userId = AuthenticateExtensions.getUserId();
        try {
            productService.addImage(userId, productId, model);
            return ResponseEntity.status(HttpStatus.OK).body("Upload successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Upload failed");
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ImageModel>> getListFiles() {
        List<ImageModel> fileInfos = fileStorageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(ProductController.class, "getFile", path.getFileName().toString()).build().toString();

            return new ImageModel(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.load(filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).header(HttpHeaders.CONTENT_DISPOSITION, "inline").body(file);
    }
}
