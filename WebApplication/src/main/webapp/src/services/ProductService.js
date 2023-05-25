/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api';

class ProductService {
    getAllProduct(page, pageSize, sortBy, sortType, brandId) {
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
    getAllProducts(page, pageSize, searchTerm, sortOrder, sortBy, categoryId, brand_id, color_id, size_id) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/products/getall", {
            params: {
                page: page,
                pageSize: pageSize,
                search: searchTerm,
                sortBy: sortBy,
                sortType: sortOrder,
                categoryId: categoryId,
                brandId: brand_id,
                colorId: color_id,
                sizeId: size_id


            }
        });
    }

    getProductById(id) {
        return axios.get(API_URL + "/products/" + id);
    }

    getProductByCategory(id) {
        return axios.get(API_URL + "/products/category/" + id);
    }
    getQuantityByWarehouseId(id, colorId, sizeId) {
        return axios.get(API_URL + `/warehouses/getQuantity/${id}`, {
            params: {
                colorId: colorId,
                sizeId: sizeId
            }
        });

    }

}

export default new ProductService();
