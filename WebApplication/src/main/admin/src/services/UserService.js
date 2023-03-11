/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api/auth';
const API_URL_USER = 'http://localhost:6868/api/users';

class UserService {

    login(user) {
        return axios.post(API_URL + "/authenticate", user);
    }

    getCurrentUser() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL_USER + "/userProfile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getAllUsers(page, pageSize) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL_USER + "/getAllUsers", {
            params: {
                page: page,
                pageSize: pageSize,
                sortBy: 'lastName'
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getTotalsUser() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL_USER + "/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new UserService();
