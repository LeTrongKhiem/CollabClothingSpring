/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
const API_URL = 'http://localhost:6868/api/auth';
const API_URL_USER = 'http://localhost:6868/api/users';
class UserService {
    saveUser(user) {
        return axios.post(API_URL + "/register", user);
    }

    verifyEmail(token) {
        return axios.get(API_URL + `/verify?code=${token}`);
    }

    checkEmailExist(email) {
        return axios.get(API_URL + `/getByEmail?email=${email}`);
    }

    login(user) {
        return axios.post(API_URL + "/authenticate", user);
    }

    resetPassword(email) {
        return axios.post(API_URL + `/reset-password?email=${email}`);
    }

    checkTokenForResetPassword(token) {
        return axios.get(API_URL + `/changePassword?code=${token}`);
    }

    changePassword(user) {
        return axios.post(API_URL + "/savePassword", user);
    }

    getCurrentUser() {
        const token = localStorage.getItem("token");
        return axios.get(API_URL_USER+"/userProfile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    updateUser(user) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL_USER+"/userUpdateProfile", user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    updatePassword(user) {
        const token = localStorage.getItem("token");
        return axios.put(API_URL_USER+ "/userChangePassword", user,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new UserService();
