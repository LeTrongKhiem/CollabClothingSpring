/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api';

class OrderService {
    getAllOrders(page, pageSize, searchTerm, sortBy, sortOrder, status, phone) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/carts/getall", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                pageSize: pageSize,
                search: searchTerm,
                sortBy: sortBy,
                sortType: sortOrder,
                status: status,
                phone: phone
            }
        });
    }
    getOrderById(id) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/carts/getorder/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    updateOrder (id, order) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL + "/carts/updateorder/" + id, order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    changeStatus (id, status) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL + "/carts/changestatusorder/" + id, status, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    }
}

export default new OrderService();
