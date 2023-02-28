/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = "http://localhost:6868/api/auth";

class UserService {
    saveUser(user) {
        return axios.post(API_URL + "/register", user);
    }

    verifyEmail(token) {
        return axios.get(
            API_URL + `/verify?code=${token}`)
    }

    checkEmailExist(email) {
        return axios.get(
            API_URL + "/checkEmailExist?email=" + email
        );
    }

    login(user) {
        return axios.post(API_URL+"/login", user);
    }
}

export default new UserService();
