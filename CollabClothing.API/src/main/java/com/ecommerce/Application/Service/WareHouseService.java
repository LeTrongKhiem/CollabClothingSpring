package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IWareHouseService;
import com.ecommerce.Application.Mappings.WareHouseMapping;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.WareHouse;
import com.ecommerce.Model.WareHouse.WareHouseModel;
import com.ecommerce.Repository.ProductRepository;
import com.ecommerce.Repository.WareHouseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Component
public class WareHouseService implements IWareHouseService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private WareHouseRepository wareHouseRepository;
    @Transactional
    @Override
    public void wareHouse(UUID productId, UUID userId, WareHouseModel model) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new RuntimeException("Product not found");
        }
        UUID id = UUID.randomUUID();
        WareHouse wareHouse = WareHouseMapping.mapToWareHouseModel(userId, id, model);
        List<WareHouse> wareHouses = wareHouseRepository.findAll();
        var checkExistsColorAndSize = wareHouses.stream().filter(x -> x.getColorId().equals(model.getColorId()) && x.getSizeId().equals(model.getSizeId())).findFirst();

        if (model.getQuantity() >= 0) {
            if (checkExistsColorAndSize.isPresent()) {
                checkExistsColorAndSize.get().setQuantity(model.getQuantity());
                wareHouseRepository.save(checkExistsColorAndSize.get());
            }
            else {
                wareHouseRepository.save(wareHouse);
            }
        } else {
            throw new RuntimeException("Quantity must be greater than 0");
        }
    }

    @Override
    public int getQuantity(UUID productId, UUID colorId, UUID sizeId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }
        List<WareHouse> wareHouses = wareHouseRepository.findAll();
        var checkExistsColorAndSize = wareHouses.stream().filter(x -> x.getColorId().equals(colorId)
                && x.getSizeId().equals(sizeId)
                && x.getProductId().equals(productId)).findFirst();
        return checkExistsColorAndSize.map(WareHouse::getQuantity).orElse(0);
    }
}
