import axios from "axios";

const API_URL = "http://localhost:6868/api";
const FETCH_COLORS = "FETCH_COLORS";
export const fetchColors = () => {
    return axios.get(`${API_URL}/products/color/getall`).then((response) => {
        return {
            type: FETCH_COLORS,
            payload: response.data,
        };
    }
    );
}
export const colorOptions = () => {
    return axios.get(`${API_URL}/products/color/getall`).then((response) => {
        return response.data.map((color) => ({
            value: color.id,
            label: color.name,
        }));
    }
    );

}


