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
export const  getProductById = async (id) => {
    const res = await ProductService.getProductById(id);
    return res.data;
}
export const  getProductByBrand = async (limit, brandId) => {
    const res = await ProductService.getAllProducts(0, limit, "name", "asc",brandId);
    return res.data;
}