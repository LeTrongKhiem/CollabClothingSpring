/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api/categories';

class CategoriesService {
    getAllCategories(page,pageSize, searchTerm, sortDirection, sortBy) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + "/all", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page ,
                pageSize: pageSize,
                search: searchTerm,
                sortBy: sortBy,
                sortDirection: sortDirection
            }
        });
    }
    addCategory(category) {
        const token = localStorage.getItem("token");
        return axios.post(API_URL + "/add", category, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }
    deleteCategory(id) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL + "/delete/" + id, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
    }
    getCategoryById(id) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
    }
    updateCategory(id, category) {
        const token  = localStorage.getItem("token");
        return axios.put(API_URL + "/update/" + id, category, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
    }
}

export default new CategoriesService();
