import axios from "axios";
const API_URL = "http://localhost:6868/api";

const fetchCategories = async () => {
    const response = axios.get(`${API_URL}/categories/all`);
    console.log(response);
    const categories = response.data.results.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        sortOrder: category.sortOrder,
        level: category.level,
        pathIcon: category.pathIcon,
        parentId: category.parentId,
        showWeb: category.showWeb,
    }));
    return categories;
};
export const categoryOptions = () => {
    return axios.get(`${API_URL}/categories/all`).then((response) => {
            console.log(response)
            return response.data.results.map((category) => ({
                value: category.id,
                label: category.name,
            }));
        }
    );

}

export default fetchCategories;