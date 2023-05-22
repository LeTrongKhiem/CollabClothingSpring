import axios from "axios";

const API_URL = "http://localhost:6868/api";
const FETCH_SIZES = "FETCH_SIZES";
export const fetchColors = () => {
    return axios.get(`${API_URL}/products/color/getall`).then((response) => {
            return {
                type: FETCH_SIZES,
                payload: response.data,
            };
        }
    );
}
export const sizeOptions = () => {
    return axios.get(`${API_URL}/products/size/getall`).then((response) => {
            return response.data.map((size) => ({
                value: size.id,
                label: size.name,
            }));
        }
    );

}


