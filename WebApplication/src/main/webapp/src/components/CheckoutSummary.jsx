import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectCartItems} from "../redux/slice/cartItemsSlice";
import Card from "../components/UI/Card";
import numberWithCommas from "../utils/numberWithCommas";
import ProductService from "../services/ProductService";

const CheckoutSummary = (props) => {
    const cartItems = useSelector(selectCartItems);
    const [isLoading, setIsLoading] = useState(true);
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

    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    // send cartTotalAmount to parent component

    useEffect(() => {
        setCartTotalAmount(cartProducts.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        // send cartTotalAmount to parent component
    }, [cartItems, isLoading]);
    return (<>
    {isLoading && <p>Loading...</p>}
    <div>
        {cartItems.length === 0 ? (<>
            <p>No item in your cart.</p>
            <button className="--btn">
                <Link to="/#products">Back To Shop</Link>
            </button>
        </>) : (<div>
            <p>{/* <b>{`Cart item(s): ${cartTotalQuantity}`}</b> */}</p>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
            }}>
                <h4>Tổng số tiền: {numberWithCommas(cartTotalAmount)} đ</h4>
            </div>
            {cartProducts.map((item) => {
                const {id, product, price, quantity, color, size} = item;
                return (
                    <div className="card-summary" key={id}>
                        <div className="card-summary__img">
                            <img src={item.imageURL} alt={item.name}/>
                        </div>
                        <div className="card-summary__info">
                            <h4> {`${product.name} - ${color.name} - ${size.name}`}</h4>
                            <p>Số lượng: {quantity}</p>
                            <p>Giá bán: {numberWithCommas(price)}</p>
                            <p>Giá cố định: {numberWithCommas(price * quantity)}</p>
                        </div>
                    </div>
                );
            })}

    </div>
    )}
    </div>

</>)
    ;
};

export default CheckoutSummary;
