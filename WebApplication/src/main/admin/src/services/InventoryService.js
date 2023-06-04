/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api';

class InventoryService {
    getAllInventory(page,pageSize, sortType, sortBy) {
        const token = localStorage.getItem("adminToken");
        return axios.get(API_URL + "/warehouses/getall", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                pageSize: pageSize,
                sortBy: sortBy,
                sortType: sortType,
            }
        });
    }
}

export default new InventoryService();
