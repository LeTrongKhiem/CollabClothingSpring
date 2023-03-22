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

    checkEmailExist(email) {
        return axios.get(API_URL + `/getByEmail?email=${email}`);
    }

    getAllUsers(page, pageSize, searchTerm, sortOrder, sortBy) {
        const token = localStorage.getItem("token");
        return axios.get(API_URL_USER + "/getAllUsers", {
            params: {
                page: page, pageSize: pageSize, search: searchTerm, sortBy: sortBy, sortType: sortOrder

            }, headers: {
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

    createUser(user) {
        const token = localStorage.getItem("token");
        return axios.post(API_URL_USER + "/adminCreateAccount", user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    logout() {
        return axios.post(API_URL + "/logout");
    }
}

export default new UserService();
