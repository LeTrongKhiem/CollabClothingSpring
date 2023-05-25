import { useEffect, useState } from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import CartService from "../../services/CartService";
import ButtonUI from "../../components/UI/ButtonUI";
import {toast} from "react-toastify";
import Helmet from "../../components/Helmet";
import Loading from "../../components/loading/Loading";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [cancelledOrder, setCancelledOrder] = useState(null);
    const [changeStatus, setChangeStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await CartService.orderHistory();
            const orderData = response.data.results;
            const orderWithDetail = await Promise.all(
                orderData.map(async (order) => {
                    const orderDetails = await CartService.getOrderByID(order.id);
                    return {
                        ...order,
                        orderDetails: orderDetails.data,
                    };
                })
            );
            setOrders(orderWithDetail);
            setLoading(false);
            setChangeStatus(false)
        };
        fetchData();
    }, [changeStatus]);

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await CartService.cancelOrder(orderId,4);
            setCancelledOrder(response.data);
            toast("Đã hủy đơn hàng thành công!", {
                type: "success",
                position: "top-center",
                autoClose: 2000,
            })
            setChangeStatus(true);
        } catch (error) {
            console.error(error);
        }
    };
    if(loading) return <Loading/>
    return (
        <Helmet title="Lịch sử đặt hàng">
        <div className="orders">
            <h1 className="orders-heading">Lịch sử đặt hàng</h1>
            <ul className="orders-list">
                {orders.map((order) => {
                    const date = new Date(order.orderDate).toLocaleDateString("vi-VN");
                    const statusArr = ["shipping", "pending", "paid", "refund"];
                    if (order.status === 1) {
                        order.status = statusArr[1];
                    } else if (order.status === 2) {
                        order.status = statusArr[0];
                    } else if (order.status === 3) {
                        order.status = statusArr[2];
                    } else if (order.status === 4) {
                        order.status = statusArr[3];
                    }
                    return (
                        <li key={order.id} className="order">
                            <div className="order-info">
                                <div className="order-id">{`Mã đơn hàng: ${order.id}`}</div>
                                <div className="order-date">{`Ngày: ${date}`}</div>
                                {order.orderDetails.map((orderDetail) => {
                                    return (
                                        <div className="order-item">
                                            <div className="order-item-image">
                                                <img src={orderDetail.image} alt="" />
                                            </div>
                                            <div className="order-item-info">
                                                <div className="order-item-name">{orderDetail.name}</div>
                                                <div className="order-item-price">{`Giá: ${numberWithCommas(
                                                    orderDetail.price
                                                )}đ`}</div>
                                                <div className="order-item-quantity">{`Số lượng: ${orderDetail.quantity}`}</div>
                                                <div className="order-item-color">{`Màu: ${orderDetail.color}`}</div>
                                                <div className="order-item-size">{`Kích thước: ${orderDetail.size}`}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="order-details">
                                <div className="order-total">{`Tổng cộng: ${numberWithCommas(order.totalMoney)}đ`}</div>
                                <div className={`order-status ${order.status}`}>
                                    {order.status === "shipping" && "Shipping"}
                                    {order.status === "pending" && "Pending"}
                                    {order.status === "paid" && "Paid"}
                                    {order.status === "refund" && "Refund"}
                                </div>
                                {order.status === "pending" && (
                                    <ButtonUI className="btn-cancel" onClick={() => handleCancelOrder(order.id)}>
                                        Cancel Order
                                    </ButtonUI>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
        </Helmet>
    );
};

export default OrderHistory;