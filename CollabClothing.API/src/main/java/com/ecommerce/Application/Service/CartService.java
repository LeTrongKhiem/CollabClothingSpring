package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.ICartService;
import com.ecommerce.Application.Mappings.CartMapping;
import com.ecommerce.Application.Mappings.ProductMapping;
import com.ecommerce.Entities.*;
import com.ecommerce.Model.Orders.OrderDetailModel;
import com.ecommerce.Model.Orders.OrderModel;
import com.ecommerce.Model.PagingModel;
import com.ecommerce.Model.Products.SearchProductItems;
import com.ecommerce.Model.SearchModel;
import com.ecommerce.Repository.*;
import com.lowagie.text.*;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.awt.Color;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Component
public class CartService implements ICartService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WareHouseRepository wareHouseRepository;

    @Override
    public boolean createOrder(UUID userId, OrderModel orderModel) {
        double totalPrice = 0;
        for (OrderDetailModel model : orderModel.getOrderDetails()) {
            Optional<Product> product = productRepository.findById(model.getProductId());
            if (product.isEmpty()) {
                throw new NotFoundException("Product not found");
            }
            totalPrice += product.get().getProductDetail().getPriceCurrent() * model.getQuantity();
        }
        Order order = CartMapping.mapOrderModel(orderModel, userId, 1, totalPrice);
        List<OrderDetail> orderDetail = CartMapping.mapOrderDetailModel(orderModel.getOrderDetails(), order);
        if (orderDetail != null) {
            orderRepository.save(order);
            orderDetailRepository.saveAll(orderDetail);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateOrder(UUID orderId, UUID userId, OrderModel orderModel) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        if (orderModel != null) {
            order.get().setShipName(orderModel.getShipName());
            order.get().setShipAddress(orderModel.getShipAddress());
            order.get().setShipEmail(orderModel.getShipEmail());
            order.get().setShipPhoneNumber(orderModel.getShipPhoneNumber());
            order.get().setPaymentMethod(orderModel.getPaymentMethod());
            order.get().setStatus(2);
            order.get().setModifiedBy(userId);
            order.get().setModifiedDate(new Date(System.currentTimeMillis()));
            orderRepository.save(order.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean changeStatusOrder(UUID orderId, UUID userId, int status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        if (status != 0) {
            order.get().setStatus(status);
            order.get().setModifiedBy(userId);
            order.get().setModifiedDate(new Date(System.currentTimeMillis()));
            if (status == 2) {
                List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(orderId);
                for (var orderDetail : orderDetails) {
                    List<WareHouse> wareHouses = wareHouseRepository.findAll();
                    WareHouse wareHouse = wareHouses.stream().filter(x -> x.getColorId().equals(orderDetail.getColorId())
                            && x.getSizeId().equals(orderDetail.getSizeId())
                            && x.getProductId().equals(orderDetail.getProductId())).findFirst().get();
                    wareHouse.setQuantity(wareHouse.getQuantity() - orderDetail.getQuantity());
                    wareHouseRepository.save(wareHouse);
                }
            }
            orderRepository.save(order.get());

            return true;
        }
        return false;
    }

    @Override
    public PagingModel<OrderModel> getAll(SearchModel items, int status, String phone) {
        Sort sort = getPageable(items);
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);
        List<Order> listProducts = orderRepository.findAll(sort);
        if (!phone.isEmpty()) {
            listProducts = listProducts.stream().filter(product -> product.getShipPhoneNumber().equals(phone)).toList();
        }
        if (status != 0) {
            listProducts = listProducts.stream().filter(product -> product.getStatus() == status).toList();
        }
        if (!items.getKeyword().isEmpty()) {
            listProducts = listProducts.stream().filter(product ->
                            product.getShipAddress().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
                                    product.getShipEmail().toLowerCase().contains(items.getKeyword().toLowerCase()))
                    .toList();
        }
        return pagingOrderModel(listProducts, items, pageable);
    }

    @Override
    public PagingModel<OrderModel> getAll(UUID userId, SearchModel items, int status, String phone) {
        Sort sort = getPageable(items);
        Pageable pageable = PageRequest.of(items.getPage(), items.getSize(), sort);
        List<Order> listProducts = orderRepository.findAll(sort);
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NotFoundException("User not found");
        }
        listProducts = listProducts.stream().filter(product -> product.getCreatedBy().equals(userId)).toList();
        if (!phone.isEmpty()) {
            listProducts = listProducts.stream().filter(product -> product.getShipPhoneNumber().equals(phone)).toList();
        }
        if (status != 0) {
            listProducts = listProducts.stream().filter(product -> product.getStatus() == status).toList();
        }
        if (!items.getKeyword().isEmpty()) {
            listProducts = listProducts.stream().filter(product ->
                            product.getShipAddress().toLowerCase().contains(items.getKeyword().toLowerCase()) ||
                                    product.getShipEmail().toLowerCase().contains(items.getKeyword().toLowerCase()))
                    .toList();
        }
        return pagingOrderModel(listProducts, items, pageable);
    }

    @Override
    public String exportPDF(UUID orderId, UUID userId, HttpServletResponse httpServletResponse) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        try {
            Document document = new Document(PageSize.A4);
            subjectReport(order.get(), document, userId, httpServletResponse);
        } catch (DocumentException e) {
            throw new DocumentException("Error export PDF");
        }
        return null;
    }

    @Override
    public double statistics(Date startDate, Date endDate) {
        List<Order> orders = orderRepository.findAll();
        if (startDate != null && endDate != null) {
            orders = orders.stream().filter(order -> order.getCreatedDate().after(startDate) && order.getCreatedDate().before(new Date(endDate.getTime() + (1000 * 60 * 60 * 24)))).toList();
        }
        return orders.stream().mapToDouble(Order::getTotalMoney).sum();
    }

    private void subjectReport(Order order, Document doc, UUID userId, HttpServletResponse httpServletResponse) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NotFoundException("User not found");
        }
        try {
            PdfWriter.getInstance(doc, httpServletResponse.getOutputStream());
            doc.open();
            BaseFont baseFont = BaseFont.createFont("arialuni.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            Font font = new Font(baseFont);
            font.setSize(18);
            font.setColor(Color.BLACK);
//            Font font2 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            Font font2 = new Font(baseFont);
            font2.setSize(14);
            font2.setColor(Color.BLACK);
            String dateCurrent = new SimpleDateFormat("dd/MM/yyyy").format(new Date(System.currentTimeMillis()));
            String nameUserReport = user.get().getFirstName() + " " + user.get().getLastName();
            Paragraph p = new Paragraph(convertUnicode("Danh sách đơn hàng"), font);
            p.setAlignment(Paragraph.ALIGN_CENTER);
            Paragraph p1 = new Paragraph(convertUnicode("Ngày in hóa đơn: ") + dateCurrent, font2);
            p1.setAlignment(Paragraph.ALIGN_RIGHT);
            Paragraph p2 = new Paragraph(convertUnicode("Nhân viên: ") + nameUserReport, font2);
            p2.setAlignment(Paragraph.ALIGN_RIGHT);
            doc.add(p);
            doc.add(p1);
            doc.add(p2);
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100f);
            table.setWidths(new float[]{3.5f, 2.0f, 1.0f, 1.5f, 2.5f});
            table.setSpacingBefore(10);

            writeTableHeader(table);
            writeTableData(order, table);

            doc.add(table);
            Paragraph p3 = new Paragraph(convertUnicode("Tên nguoi nhan: ") + convertUnicode(order.getShipName()), font2);
            p3.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p4 = new Paragraph(convertUnicode("Email: ") + convertUnicode(order.getShipEmail()), font2);
            p4.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p5 = new Paragraph(convertUnicode("Dien thoai: ") + convertUnicode(order.getShipPhoneNumber()), font2);
            p5.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p6 = new Paragraph(convertUnicode("Ngày dat hàng: ") +
                    new SimpleDateFormat("dd/MM/yyyy").format(order.getCreatedDate()), font2);
            p6.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p7 = new Paragraph(convertUnicode("Phương thuc thanh toán: ") +
                    convertUnicode(convertPaymentMethod(order.getPaymentMethod())), font2);
            p7.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p8 = new Paragraph(convertUnicode("Trang thái: ") +
                    convertUnicode(convertStatus(order.getStatus())), font2);
            p8.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            Paragraph p9 = new Paragraph(convertUnicode("Tong tien: ") + order.getTotalMoney() + "VNĐ", font2);
            p9.setAlignment(Paragraph.ALIGN_CENTER | Paragraph.ALIGN_RIGHT);
            doc.add(p3);
            doc.add(p4);
            doc.add(p5);
            doc.add(p6);
            doc.add(p7);
            doc.add(p8);
            doc.add(p9);
            doc.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String convertPaymentMethod(int paymentMethod) {
        return switch (paymentMethod) {
            case 0 -> "Thanh toán khi nhận hàng";
            case 1 -> "Thanh toán qua thẻ";
            default -> "Thanh toán khi nhận hàng";
        };
    }

    private String convertStatus(int status) {
        return switch (status) {
            case 1 -> "Đang xử lý";
            case 2 -> "Đang giao hàng";
            case 3 -> "Đã giao hàng";
            case 4 -> "Đã hủy";
            default -> "Đang xử lý";
        };
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.gray);
        cell.setPadding(5);
        BaseFont baseFont = null;
        try {
            baseFont = BaseFont.createFont("arialuni.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Font font = new Font(baseFont);
        font.setColor(Color.WHITE);
        cell.setPhrase(new Phrase(convertUnicode("Tên san pham"), font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(convertUnicode("Màu"), font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(convertUnicode("Kích co"), font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(convertUnicode("So luong"), font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(convertUnicode("Đơn giá"), font));
        table.addCell(cell);
    }

    private void writeTableData(Order order, PdfPTable table) {
        for (var orderDetail : order.getOrderDetail()) {
            Product product = productRepository.findById(orderDetail.getProductId()).get();
            Size size = sizeRepository.findById(orderDetail.getSizeId()).get();
            com.ecommerce.Entities.Color color = colorRepository.findById(orderDetail.getColorId()).get();
            double price = product.getProductDetail().getPriceCurrent();
            double total = price * orderDetail.getQuantity();
            table.addCell(convertUnicode(product.getName()));
            table.addCell(convertUnicode(color.getName()));
            table.addCell(convertUnicode(size.getName()));
            table.addCell(String.valueOf(orderDetail.getQuantity()));
            table.addCell(String.valueOf(price));
        }
    }

    private String convertUnicode(String text) {
        return new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
    }

    private Sort getPageable(SearchModel items) {
        Sort sort;
        if (items.getSortType() != null && items.getSortType().equals("desc")) {
            sort = Sort.by(Sort.Order.desc(items.getSortBy()));
        } else {
            sort = Sort.by(Sort.Order.asc(items.getSortBy()));
        }
        return sort;
    }

    private PagingModel<OrderModel> pagingOrderModel(List<Order> orders, SearchModel items, Pageable pageable) {
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), orders.size());
        final Page<Order> page = new PageImpl<>(orders.subList(start, end), pageable, orders.size());
        var result = CartMapping.mapListOrder(page.getContent());
        int totalPage = (int) Math.ceil((double) orders.size() / items.getSize());
        int totalItem = orders.size();
        return new PagingModel<>(result, items.getSize(), totalItem, items.getPage(), totalPage);
    }

    @Override
    public List<OrderDetailModel> getOrderDetail(UUID orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(orderId);
        List<OrderDetailModel> orderDetailModels = new ArrayList<>();
        if (!order.isPresent()) {
            return null;
        }
        for (OrderDetail orderDetail : orderDetails) {
            Product product = productRepository.findById(orderDetail.getProductId()).orElseThrow();
            String size = sizeRepository.findById(orderDetail.getSizeId()).get().getName();
            String color = colorRepository.findById(orderDetail.getColorId()).get().getName();
            OrderDetailModel orderDetailModel = CartMapping.mapOrderDetail(orderDetail, product, color, size);
            orderDetailModels.add(orderDetailModel);
        }
        return orderDetailModels;
    }

    @Override
    public OrderModel getOrder(UUID orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            return null;
        }
        return CartMapping.mapOrder(order.get());
    }
}
