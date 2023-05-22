import axios from "axios";

const API_URL = "http://localhost:6868/api";
const fetchBrand = async () => {
    const response = await axios.get(`http://localhost:6868/api/brands/all`)
    const brands = response.data.map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        pathLogo: brand.pathLogo,
    }));
    return brands;
}
export const brandOptions = () => {
    return axios.get(`http://localhost:6868/api/brands/all`).then((response) => {
        return response.data.map((brand) => ({
            value: brand.id,
            label: brand.name,
        }));
    }
    );
}
export default fetchBrand;