const OrderHistory = () => {
    const orders = [
        { id: 1, date: '2022-05-20', total: 29.99, status: 'shipped' },
        { id: 2, date: '2022-05-21', total: 49.99, status: 'delivered' },
        { id: 3, date: '2022-05-22', total: 59.99, status: 'processing' },
    ];
    return (
        <div className="orders">
            <h1 className="orders-heading">Orders</h1>
            <ul className="orders-list">
                {orders.map(order => (
                    <li key={order.id} className="order">
                        <div className="order-info">
                            <div className="order-id">{`OrderID: ${order.id}`}</div>
                            <div className="order-date">{`Date: ${order.date}`}</div>
                        </div>
                        <div className="order-details">
                            <div className="order-total">{`Total: $${order.total}`}</div>
                            <div className="order-status">{order.status}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>)
}
export default OrderHistory;