import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../../components/CartItem";
import Button from "../../components/UI/ButtonUI";
import Helmet from "../../components/Helmet";
import numberWithCommas from "../../utils/numberWithCommas";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import {selectCartItems} from "../../redux/slice/cartItemsSlice";
import ProductService from "../../services/ProductService";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true)
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
    console.log(cartProducts)
    setIsLoading(false)
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
  console.log(cartProducts);
  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(getCartItemsInfo(cartItems));
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
  const checkout = () => {
    if (isLoggin) {
      navigate("/checkout-details");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet title="Giỏ hàng">
        <div className="cart">
          <div className="cart__list">
            {isLoading ? (
              <div>loading</div>
            ) : (
              cartProducts.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            )}
          </div>
          <div className="cart__info">
            <div className="cart__info__txt">
              <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
              <div className="cart__info__txt__price">
                <span>Thành tiền:</span>{" "}
                <span>{numberWithCommas(Number(totalPrice))}</span>
              </div>
            </div>
            <div className="cart__info__btn">
              <Button size="block" onClick={checkout}>
                Đặt hàng
              </Button>
              <Link to="/catalog">
                <Button size="block">Tiếp tục mua hàng</Button>
              </Link>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Cart;
