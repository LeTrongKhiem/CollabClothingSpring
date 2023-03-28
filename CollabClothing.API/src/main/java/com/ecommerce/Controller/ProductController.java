package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IFileStorageService;
import com.ecommerce.Application.Abstractions.IProductService;
import com.ecommerce.Application.Extensions.FileUploadModelConverter;
import com.ecommerce.Application.PreAuthorizes.AdminOnly;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Application.Setup.Auth.Extensions.AuthenticateExtensions;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.ProductImage;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
    public class ProductController {
    @Autowired
    IProductService productService;
    @Autowired
    IFileStorageService fileStorageService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    @StaffRole
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product result = productService.AddProduct(product);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Product", "api/products/" + product.getId().toString());
        return new ResponseEntity<>(product, headers, HttpStatus.CREATED);
    }

    @PostMapping("/saveProduct")
    @StaffRole
    public ResponseEntity<Boolean> saveProduct(@Valid @RequestBody ProductModel model, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        var userId = AuthenticateExtensions.getUserId();
        boolean result = productService.save(userId, model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/all")
    @StaffRole
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
    @StaffRole
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
    @StaffRole
    public ResponseEntity<String> uploadImage(@RequestParam UUID productId, MultipartHttpServletRequest request) {
        UUID userId = AuthenticateExtensions.getUserId();
        List<PartFileModel> model = FileUploadModelConverter.convert(request);
        try {
            productService.addImage(userId, productId, model);
            return ResponseEntity.status(HttpStatus.OK).body("Upload successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Upload failed");
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ImageModel>> getListFiles() {
        List<ImageModel> fileInfos = fileStorageService.loadAll().map(path -> {
            ImageModel imageModel = new ImageModel();
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(ProductController.class, "getFile", path.getFileName().toString()).build().toString();
            String alt = filename.substring(0, filename.lastIndexOf("."));
            imageModel.setUrl(url);
            imageModel.setFileName(filename);
            return imageModel;
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.load(filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file);
    }

    @GetMapping("/images/{productId}")
    public ResponseEntity<PagingModel<ImageModel>> getImages(@PathVariable UUID productId, @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int pageSize) {
        try {
            var result = productService.getImages(productId, page, pageSize);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/image/{imageId}")
    @StaffRole
    public ResponseEntity<ImageModel> getImage(@PathVariable UUID imageId) {
        try {
            var result = productService.getImage(imageId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<PagingModel<ProductModel>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortType,
            @RequestParam(defaultValue = "") UUID categoryId,
            @RequestParam(defaultValue = "") UUID brandId) {
        SearchProductItems searchProductItems = new SearchProductItems(search, brandId, categoryId, page, pageSize, sortBy, sortType);
        try {
            PagingModel<ProductModel> products = productService.getAll(searchProductItems);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{productId}")
    @StaffRole
    public ResponseEntity<Boolean> updateProduct(@PathVariable UUID productId, @Valid @RequestBody ProductModel model, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        var userId = AuthenticateExtensions.getUserId();
        boolean result = productService.updateProduct(productId, userId, model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("delete/{productId}")
    @StaffRole
    public ResponseEntity<Boolean> deleteProduct(@PathVariable UUID productId) {
        var userId = AuthenticateExtensions.getUserId();
        boolean result = productService.deleteProduct(productId, userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
