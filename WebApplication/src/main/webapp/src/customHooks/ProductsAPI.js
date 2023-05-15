import axios from "axios";
import ProductService from "../services/ProductService";

export const getProducts = async (limit) => {
    const res = await ProductService.getAllProducts(0, limit);
    return res.data;
}
export const getProductLatest = async (limit) => {
    const res = await ProductService.getAllProducts(0, limit, "name", "asc");
    return res.data;
}