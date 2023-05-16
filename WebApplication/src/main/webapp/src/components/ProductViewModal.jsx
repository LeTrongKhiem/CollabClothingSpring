import React, {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import ProductView from "./ProductView";

import Button from "./UI/ButtonUI";

import {remove} from "../redux/slice/productModalSlice";
import {getProductById, getProducts} from "../customHooks/ProductsAPI";
import axios from "axios";
import ProductService from "../services/ProductService";

const ProductViewModal = () => {
    const [product, setProduct] = useState(undefined);
    console.log(product)
    const id = useSelector((state) => state.productModal.value);
    console.log(id)
    const dispatch = useDispatch();
    useEffect(() => {
        if(id !== null){
            const getProduct = async () => {
                const response = await ProductService.getProductById(id)
                setProduct(response.data)
            }
            getProduct()
        }
        else{
            setProduct(undefined)
        }
    }, [id]);

    return (
        <div
            className={`product-view__modal ${product === undefined ? "" : "active"}`}
        >
            <div className="product-view__modal__content">
                <ProductView product={product} />
                <div className="product-view__modal__content__close">
                    <Button size="sm" onClick={() => dispatch(remove())}>
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;
