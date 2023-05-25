/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api';

class CartService {
    createOrder(order) {
        const token = localStorage.getItem("token");
        return axios.post(API_URL + "/carts/createorder", order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    orderHistory() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/carts/getOrderHistory", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    getOrderByID(id) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/carts/getorderdetail/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    cancelOrder(id, status) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL + "/carts/changestatusorder/" + id, status, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    }



}

export default new CartService();
