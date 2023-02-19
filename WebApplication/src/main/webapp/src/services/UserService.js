/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const API_URL = "http://localhost:6666/api/auth";
class UserService {
  saveUser(user) {
    return axios.post("http://localhost:6666/api/auth/register", user);
  }
}
export default new UserService();
