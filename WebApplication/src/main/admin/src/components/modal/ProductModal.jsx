import React, {useEffect, useState} from "react";

import "./productModal.css"
import ProductsService from "../../services/ProductsService";

function ProductModal({showModal, closeModal, productId}) {
    const API_URL = "http://localhost:6868/"
    const [modal, setModal] = useState(showModal);
    const [product, setProduct] = useState(null);

    console.log(product)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (productId === null) {
            setLoading(false)
            return;
        } else {
            async function fetchOrderById() {
                const response = await ProductsService.getProductById(productId);
                setProduct(response.data)
                setLoading(false)
            }

            fetchOrderById().then(r => {
                setLoading(false)
            });
        }


    }, [productId])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div className={`product-view__modal ${showModal ? "active" : ""}`}>
            <div className="product-view__modal__content detail">
                <div className="product-view__modal__content__close">
                    <button onClick={closeModal}>
                        <i className="fas fa-times"></i>
                        Đóng
                    </button>
                </div>
                <div className="product-view__modal__content__body">
                    <div className="product-view__modal__content__image">
                        <img
                            src={`${product !== null ? API_URL + product.productImages[0].url : null}`}
                            alt="Tên sản phẩm"/>
                    </div>
                    <div className="product-view__modal__content__details">
                        <p className="product-view__modal__content__description">
                            Mô tả sản phẩm
                        </p>
                        <ul className="product-view__modal__content__features">
                            <li>Cotton: {product !== null ? product.cotton : null}%</li>
                            <li>Form: {product !== null ? product.form : null}</li>
                            <li>Size: {
                                product !== null &&
                                product.listSize.map((size, index) => {
                                        return (
                                            <span key={index}>{size.name} </span>
                                        )

                                    }
                                )
                            }</li>
                            <li>Màu sắc: {
                                product !== null &&
                                product.listColor.map((color, index) => {
                                        return (
                                            <span key={index}>{color.name} </span>
                                        )

                                    }
                                )

                            }</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default ProductModal;