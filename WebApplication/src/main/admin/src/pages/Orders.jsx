import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import {useTranslation} from "react-i18next";
import AddCategories from "../components/modal/AddCategories";
import CategoriesService from "../services/CategoriesService";
import EditCategories from "../components/modal/EditCategories";
import {toast} from "react-toastify";
import OrderService from "../services/OrderService";
import EditOrder from "../components/modal/EditOrder";
import Badge from "../components/badge/Badge";
import ChangeOrderStatus from "../components/modal/ChangeOrderStatus";
import Loading from "../components/loading/Loading";

const customerTableHead = [{key: "number", label: "#"}, {key: "shipName", label: "orders.shipName"}, {
    key: "", label: "orders.shipAddress"
}, {key: "", label: "orders.shipEmail"}, {key: "", label: "orders.shipPhone"}, {
    key: "", label: "orders.paymentMethod"
}, {key: "", label: "orders.totalMoney"}, {key: "", label: "orders.orderDate"}, {key: "", label: "orders.status"}, {
    key: "action", label: "products.action"
}]

const orderStatus = {
    "shipping": "primary", "pending": "warning", "paid": "success", "refund": "danger"
}
const Orders = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders)
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm)
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showStatusModal, setStatusModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [sortColumn, setSortColumn] = useState("shipName");
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderId, setOrderId] = useState(null);
    const [status, setStatus] = useState(0);
    const [changeStatus, setChangeStatus] = useState(1);
    const [phone, setPhone] = useState('');
    const openEditModal = () => {
        setEditModal(true);
    }
    const closeEditModal = () => {
        setEditModal(false);
    }
    const openStatusModal = () => {
        setStatusModal(true);
    }
    const closeStatusModal = () => {
        setStatusModal(false);
    }
    const renderBody = (item, index) => {

        const {
            id, shipName, orderDate, shipAddress, shipEmail, shipPhoneNumber, status, paymentMethod, totalMoney
        } = item;
        const handleEditClick = () => {
            setOrderId(id);
            openEditModal();
        };

        const date = new Date(orderDate).toLocaleDateString("vi-VN");
        const statusArr = ["shipping", "pending", "paid", "refund"];
        if (item.status === 1) {
            item.status = statusArr[1];
        } else if (item.status === 2) {
            item.status = statusArr[0];
        } else if (item.status === 3) {
            item.status = statusArr[2];
        } else if (item.status === 4) {
            item.status = statusArr[3];

        }
        const handleStatusClick = () => {
            setOrderId(id);
            openStatusModal();
        }
        const handlePrintReceipt = () => {
            OrderService.exportReceipt(id).then((response) => {
                if (response.status === 200) {
                    toast.success("Đã xuất hóa đơn")
                }
            }).catch((error) => {
                console.log(error)
            })


        }
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{shipName}</td>
            <td>{shipAddress}</td>
            <td>{shipEmail}</td>
            <td>{shipPhoneNumber}</td>
            <td>{paymentMethod}</td>
            <td>{totalMoney}</td>
            <td>{date}</td>
            <td><Badge type={orderStatus[item.status]} content={item.status}/></td>

            <td>
                <button className="btn" style={{
                    outline: "none", border: "none", backgroundColor: "transparent", fontSize: "1rem",

                }} onClick={handleEditClick}>
                    <i className='bx bx-edit'></i>
                </button>

                <button className="btn" style={{
                    outline: "none", border: "none", backgroundColor: "transparent", fontSize: "1rem",

                }} onClick={handleStatusClick}>
                    <i className='bx bx-reset'></i>
                </button>
                <button className="btn" style={{
                    outline: "none", border: "none", backgroundColor: "transparent", fontSize: "1rem",

                }}
                        onClick={() => handlePrintReceipt(id)}
                >
                    <i className='bx bx-receipt'></i>
                </button>

            </td>

        </tr>)

    }
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            const response = await OrderService.getAllOrders(currentPage, pageSize, searchTerm, sortColumn, sortOrder, status, phone);
            setOrders(response.data.results);
            setTotalPages(response.data.totalPages);

            setLoading(false);
            setChanges(false);
        };
        getOrders();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder, changes, status, phone]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page); //trừ 1 vì page bắt đầu từ 0
        console.log(page)
    }, []);
    const handleSort = useCallback((column) => {
        setSortColumn(column);
        if (sortOrder === 'asc') {
            setSortOrder('desc')
        } else {
            setSortOrder('asc')
        }
    }, [sortColumn, sortOrder]);
    const {t} = useTranslation();
    return (<>

        <div>
            <h2 className="page-header">
                {t('orders.title')}
            </h2>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="user-register">
                            <EditOrder showModalEdit={editModal} closeModalEdit={closeEditModal}
                                       orderId={orderId} setChanges={setChanges}/>
                            <ChangeOrderStatus showStatusModal={showStatusModal} closeStatusModal={closeStatusModal}
                                               orderId={orderId} setChanges={setChanges}/>
                        </div>
                        <div className="card__body">
                            <div className="search-container">
                                <input
                                    type="search"
                                    placeholder="Tìm kiếm theo số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                            </div>
                            {loading ? <Loading/> : (<Table
                                limit={pageSize}
                                headData={customerTableHead}
                                data={orders}
                                renderBody={(item, index) => renderBody(item, index)}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onChangePage={handlePageChange}
                                pageSize={pageSize}
                                sortColumn={sortColumn}
                                sortOrder={sortOrder}
                                onSort={handleSort}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Orders;
