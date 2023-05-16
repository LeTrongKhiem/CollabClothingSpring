/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api';

class ProductService {
    getAllProducts(page, pageSize, sortBy, sortType, brandId) {
        return axios.get(API_URL + "/products/getall", {
            params: {
                page: page,
                pageSize: pageSize,
                sortBy: sortBy,
                sortType: sortType,
                brandId: brandId

            }
        });
    }

    getProductById(id) {
        return axios.get(API_URL + "/products/" + id);
    }

    getProductByCategory(id) {
        return axios.get(API_URL + "/products/category/" + id);
    }

}

export default new ProductService();
