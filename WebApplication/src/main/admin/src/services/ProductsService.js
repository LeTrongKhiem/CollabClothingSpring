/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api/';
const API_URL_USER = 'http://localhost:6868/api/users';


class ProductsService {

    getCategory() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "categories/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getBrand() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "brands/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }

    saveProduct(product) {
        const token = localStorage.getItem("token");
        return axios.post(API_URL + "products/saveProduct", product, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getAllProducts(page, pageSize, searchTerm, sortOrder, sortBy) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "products/getall", {
            params: {
                page: page, pageSize: pageSize, search: searchTerm, sortBy: sortBy, sortType: sortOrder

            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    deleteProduct(id) {
        const token = localStorage.getItem("token");
        return axios.delete(API_URL + "products/delete/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    saveProductImage(id, image) {
        const token = localStorage.getItem("token");
        return axios.post("http://localhost:6868/api/products/image/upload?productId=" + id, image, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        );
    }

    getProductImage(id) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "products/images/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new ProductsService();
