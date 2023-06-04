import React, {useCallback, useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CartItem from "../../components/CartItem";
import Button from "../../components/UI/ButtonUI";
import Helmet from "../../components/Helmet";
import numberWithCommas from "../../utils/numberWithCommas";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";
import {save_url, selectCartItems} from "../../redux/slice/cartItemsSlice";
import ProductService from "../../services/ProductService";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import Loading from "../../components/loading/Loading";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {t} = useTranslation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isLoggin = useSelector(selectIsLoggedIn);
    const getCartItemsInfo = async (cartItems) => {
        const cartProducts = [];
        for (const item of cartItems) {
                const res = await ProductService.getProductById(item.id);
                if (res.status === 200) {
                    cartProducts.push({
                        ...item,
                        product: res.data,
                    });


            }
        }
        return cartProducts;
    };

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const fetchCartItemsInfo = async () => {
            const products = await getCartItemsInfo(cartItems);
            setCartProducts(products);
            setIsLoading(false);
        };
        fetchCartItemsInfo();
    }, [cartItems]);

    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(
            cartItems.reduce(
                (total, item) => total + Number(item.quantity) * Number(item.price),
                0
            )
        );
        setTotalProducts(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
        );
    }, [cartItems]);
    const url= window.location.href;
    const checkout = () => {
        if (isLoggin) {
            navigate("/checkout");
        } else {
            dispatch(save_url(url))
            toast.error("Bạn cần đăng nhập để tiếp tục")
            navigate("/login");
        }
    };

    return (
        <>
            <Helmet title="Giỏ hàng">
                <div className="cart">
                    <div className="cart__list">
                        {isLoading ? (
                            <Loading/>
                        ) : (
                            cartProducts.map((item, index) => (
                                <CartItem key={index} item={item}/>
                            ))
                        )}
                    </div>
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <p>{t("cart.totalProduct")} {totalProducts} {t("cart.product")} </p>
                            <div className="cart__info__txt__price">
                                <span>{t("cart.total")}:</span>{" "}
                                <span>{numberWithCommas(Number(totalPrice))}</span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            <Button size="block" onClick={checkout}>
                                {t("cart.checkout")}
                            </Button>
                            <Link to="/catalog">
                                <Button size="block">{t("cart.goToShop")}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Helmet>
        </>
    );
};

export default Cart;
