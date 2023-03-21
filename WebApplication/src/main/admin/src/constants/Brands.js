import axios from "axios";
import ProductsService from "../services/ProductsService";


const fetchBrand = async () => {
    const response = await ProductsService.getBrand()
    const brands = response.data.map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        pathLogo: brand.pathLogo,
    }));
    return brands;
}
export default fetchBrand;