import {useEffect, useState} from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import CartService from "../../services/CartService";
import ButtonUI from "../../components/UI/ButtonUI";
import {toast} from "react-toastify";
import Helmet from "../../components/Helmet";
import Loading from "../../components/loading/Loading";
import {useTranslation} from "react-i18next";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [cancelledOrder, setCancelledOrder] = useState(null);
    const [changeStatus, setChangeStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation()
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
            const response = await CartService.cancelOrder(orderId, JSON.parse("4"));
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
    if (loading) return <Loading/>
    return (
        <Helmet title="Lịch sử đặt hàng">
            <div className="orders">
                <h1 className="orders-heading">{t("orders.orderHistory")}</h1>
                <ul className="orders-list">
                    {orders.map((order) => {
                        const date = new Date(order.orderDate).toLocaleDateString("vi-VN");
                        const statusArr = ["Đang xử lý", "Đang giao hàng", "Đã giao hàng", "Đã huỷ"];
                        if (order.status === 1) {
                            order.status = statusArr[0];
                        } else if (order.status === 2) {
                            order.status = statusArr[1];
                        } else if (order.status === 3) {
                            order.status = statusArr[2];
                        } else if (order.status === 4) {
                            order.status = statusArr[3];
                        }
                        console.log(order.status)
                        return (
                            <li key={order.id} className="order">
                                <div className="order-info">
                                    <div className="order-id">{`${t("orders.orderId")}: ${order.id}`}</div>
                                    <div className="order-date">{`${t("orders.date")}: ${date}`}</div>
                                    {order.orderDetails.map((orderDetail) => {
                                        return (
                                            <div className="order-item">
                                                <div className="order-item-image">
                                                    <img src={orderDetail.image} alt=""/>
                                                </div>
                                                <div className="order-item-info">
                                                    <div className="order-item-name">{orderDetail.name}</div>
                                                    <div
                                                        className="order-item-price">{`${t("orders.price")}: ${numberWithCommas(
                                                        orderDetail.price
                                                    )}đ`}</div>
                                                    <div
                                                        className="order-item-quantity">{`${t("orders.quantity")}: ${orderDetail.quantity}`}</div>
                                                    <div
                                                        className="order-item-color">{`${t("orders.color")}: ${orderDetail.color}`}</div>
                                                    <div
                                                        className="order-item-size">{`${t("orders.size")}: ${orderDetail.size}`}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="order-details">
                                    <div
                                        className="order-total">{`${t("orders.total")}: ${numberWithCommas(order.totalMoney)}đ`}</div>
                                    <div className={`order-status ${
                                        order.status === "Đang xử lý" ? "pending" : order.status === "Đang giao hàng" ? "shipping" : order.status === "Đã giao hàng" ? "paid" : "refund"
                                    }`}>
                                        {order.status === "Đang xử lý" && "Đang xử lý"}
                                        {order.status === "Đang giao hàng" && "Đang giao hàng"}
                                        {order.status === "Đã giao hàng" && "Đã giao hàng"}
                                        {order.status === "Đã huỷ" && "Đã huỷ"}
                                    </div>
                                    {order.status === "Đang xử lý" && "Đang xử lý" && (
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