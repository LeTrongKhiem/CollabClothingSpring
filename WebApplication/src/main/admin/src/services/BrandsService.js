/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api/brands';

class BrandsService {
    getAllbrands() {
        const token = localStorage.getItem("adminToken");
        return axios.get(API_URL + "/all", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
    addBrand(brand) {
        const token = localStorage.getItem("adminToken");
        return axios.post(API_URL + "/create", brand, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }
    deleteBrand(id) {
        const token = localStorage.getItem("adminToken");
        return axios.put(API_URL + "/delete/" + id, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    }
    getBrandById(id) {
        const token = localStorage.getItem("adminToken");
        return axios.get(API_URL + `/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    }
    updateBrand(id, category) {
        const token  = localStorage.getItem("adminToken");
        return axios.put(API_URL + "/update/" + id, category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    }
}

export default new BrandsService();
