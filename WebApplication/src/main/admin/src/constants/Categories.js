import axios from "axios";
import ProductsService from "../services/ProductsService";


const fetchCategories = async () => {
    const response = await ProductsService.getCategory();
    const categories = response.data.results.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        sortOrder: category.sortOrder,
        level: category.level,
    }));
    return categories;
};

export default fetchCategories;