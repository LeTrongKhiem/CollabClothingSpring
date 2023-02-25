/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const API_URL = "http://localhost:6666/api/auth";

class UserService {
    saveUser(user) {
        return axios.post("http://localhost:6868/api/auth/register", user);
    }

    verify() {
        return axios.get("http://localhost:6868/api/auth/verify?code=qHKItqbhFOOBVuuFe1nNIodIU7Z2x5YxlutzQgXQcg2otbGVVOP0zrav4fkXRgJC");
    }

    checkEmailExist(email) {
        return axios.get("http://localhost:6868/api/auth/checkEmailExist?email=" + email);
    }


}

export default new UserService();
