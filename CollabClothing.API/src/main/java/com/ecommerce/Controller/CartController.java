package com.ecommerce.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class CartController {
}
