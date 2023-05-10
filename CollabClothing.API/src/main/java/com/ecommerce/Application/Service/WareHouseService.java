package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IWareHouseService;
import com.ecommerce.Application.Mappings.ProductMapping;
import com.ecommerce.Application.Mappings.WareHouseMapping;
import com.ecommerce.Entities.Color;
import com.ecommerce.Entities.Product;
import com.ecommerce.Entities.Size;
import com.ecommerce.Entities.WareHouse;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.WareHouse.WareHouseModel;
import com.ecommerce.Repository.ColorRepository;
import com.ecommerce.Repository.ProductRepository;
import com.ecommerce.Repository.SizeRepository;
import com.ecommerce.Repository.WareHouseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Component
public class WareHouseService implements IWareHouseService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private WareHouseRepository wareHouseRepository;

    @Transactional
    @Override
    public boolean wareHouse(UUID productId, UUID userId, WareHouseModel model) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new RuntimeException("Product not found");
        }
        UUID id = UUID.randomUUID();
        WareHouse wareHouse = WareHouseMapping.mapToWareHouseModel(userId, id, productId, model);
        List<WareHouse> wareHouses = wareHouseRepository.findAll();
        var checkExistsColorAndSize = wareHouses.stream().filter(x -> x.getColorId().equals(model.getColorId()) && x.getSizeId().equals(model.getSizeId())
                && x.getProductId().equals(productId)).findFirst();

        if (model.getQuantity() >= 0) {
            if (checkExistsColorAndSize.isPresent()) {
                checkExistsColorAndSize.get().setQuantity(model.getQuantity());
                wareHouseRepository.save(checkExistsColorAndSize.get());
                return true;
            } else {
                wareHouseRepository.save(wareHouse);
                return true;
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

    @Override
    public PagingModel<WareHouseModel> getAll(SearchProductItems items) {
        Sort sort;
        if (items.getSortType() != null && items.getSortType().equals("desc")) {
            sort = Sort.by(Sort.Order.desc(items.getSortBy()));
        } else {
            sort = Sort.by(Sort.Order.asc(items.getSortBy()));
        }
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);

        List<WareHouse> listProducts = wareHouseRepository.findAll(sort);
//        if (items.getKeyword() != null) {
//            listProducts = listProducts.stream().filter(product ->
//                            product.getName().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
//                                    product.getBrand().getName().toLowerCase().contains(items.getKeyword().toLowerCase()))
//                    .toList();
//        }
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), listProducts.size());
        final Page<WareHouse> page = new PageImpl<>(listProducts.subList(start, end), pageable, listProducts.size());
        var result = WareHouseMapping.getListProduct(page.getContent());
        int totalPage = (int) Math.ceil((double) listProducts.size() / items.getSize());
        int totalItem = listProducts.size();
        return new PagingModel<>(result, items.getSize(), totalItem, items.getPage(), totalPage);
    }

    @Override
    public WareHouseModel getWareHouse(UUID wareHouseId) {
        Optional<WareHouse> wareHouse = wareHouseRepository.findById(wareHouseId);
        if (wareHouse.isEmpty()) {
            throw new RuntimeException("WareHouse not found");
        }
        Product product = productRepository.findById(wareHouse.get().getProductId()).get();
        Color color = colorRepository.findById(wareHouse.get().getColorId()).get();
        Size size = sizeRepository.findById(wareHouse.get().getSizeId()).get();
        return WareHouseMapping.mapWareHouse(wareHouse.get(), product, color, size);
    }
}
