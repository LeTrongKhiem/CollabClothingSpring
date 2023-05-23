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


}

export default new CartService();
