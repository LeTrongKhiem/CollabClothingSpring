import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useLocation, useNavigate, useParams } from "react-router";

import { useDispatch } from "react-redux";


import { toast } from "react-toastify";
import Button from "./UI/ButtonUI";

import numberWithCommas from "../utils/numberWithCommas";
import ProductService from "../services/ProductService";
import {addItem} from "../redux/slice/cartItemsSlice";
import {remove} from "../redux/slice/productModalSlice";

const ProductView = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let product = props.product;
    console.log(product)
    if(product === undefined){
        product = {
            productImages: [
                {

                }
            ],
            priceCurrent: 0,
            listColor: [
                {
                    name: "",
                }
            ],
            listSize: [
                {

                }
            ],
            description: "",
            name: "",
            slug: "",
            imageURL: [
                {

                }
            ]



        }

    }
    const [previewImg, setPreviewImg] = useState(product.productImages[0].url);
    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const [color, setColor] = useState(null);
    console.log(color === null ? null : color.id)

    const [size, setSize] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [quantityInStock,setQuantityInStock] = useState(0)
    const updateQuantity = (type) => {
        if (type === "plus") {
            if(quantity >= quantityInStock){
                setQuantity(quantityInStock);
            }else {
                setQuantity(quantity + 1);
            }
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };


    useEffect(() => {
        setPreviewImg(product.productImages[0].url);
        setQuantity(1);
        setColor(null);
        setSize(null);
    }, [product]);
  const  checkInventory = () => {
      if(color === null  ||  size === null){
          return false;
      }
      return true;
  }
  useEffect(() =>{
      if(checkInventory()){
          const  getQuantity = async  () =>{
              const  res = await ProductService.getQuantityByWarehouseId(product.id,color.id,size.id)
              console.log(res.data)
              setQuantityInStock(res.data);
          }
          getQuantity()
      }

  },[color,size, product.id])
    const check = () => {
        if (color === null) {
            toast.error("Vui lòng chọn màu", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }

        if (size === undefined) {
            toast.error("Vui lòng chọn size");
            return false;
        }

        return true;
    };

    const addToCart = () => {
        if (check()) {
            let newItem = {
                color: color,
                size: size,
                price: product.priceCurrent,
                quantity: quantity,
                imageURL: `/${product.productImages[0].url}`,
                id: product.id,
            };
            console.log(newItem)
            if(dispatch(addItem(newItem))){
                toast.success("Thêm giỏ hàng thành công")
            }
            else{
                toast.error("Có lỗ xảy ra")
            }

        }
    };

    const goToCart = () => {
        if (check()) {
            let newItem = {
                color: color,
                size: size,
                price: product.priceCurrent,
                quantity: quantity,
                imageURL: `/${product.productImages[0].url}`,
                id: product.id,
            };
            if (dispatch(addItem(newItem))) {
                dispatch(remove());
                navigate("/cart");
            } else {
                toast.error("Thêm vào giỏ hàng thất bại");
            }

        }
    };

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(product.productImages[0].url)}
                    >
                        <img src={product.productImages[0].url} alt="" />
                    </div>
                    <div
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(product.productImages[1].url)}
                    >
                        <img src={product.productImages[1]} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={`/${previewImg}`} alt="" />
                </div>
                <div
                    className={`product-description ${!descriptionExpand ? "expand" : ""}`}
                >
                    <div className="product-description__title">Chi tiết sản phẩm</div>
                    <div
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                    <div className="product-description__toggle">
                        <Button
                            size="sm"
                            onClick={() => setDescriptionExpand(!descriptionExpand)}
                        >
                            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.name}</h1>
                <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.priceCurrent)}
          </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">Màu sắc</div>
                    <div className="product__info__item__list">
                        {product.listColor.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${
                                    color === item ? "active" : ""
                                }`}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item.name.replace(" ", "")}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">Kích cỡ</div>
                    <div className="product__info__item__list">
                        {product.listSize.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${
                                    size === item ? "active" : ""
                                }`}
                                onClick={() => setSize(item)}
                            >
                <span className="product__info__item__list__item__size">
                  {item.name}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">Số lượng</div>
                    <div className="product__info__item__quantity">
                        <div
                            className="product__info__item__quantity__btn"
                            onClick={() => updateQuantity("minus")}
                        >
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div
                            className="product__info__item__quantity__btn"
                            onClick={() => updateQuantity("plus")}
                        >
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
            <div
                className={`product-description mobile ${
                    descriptionExpand ? "expand" : ""
                }`}
            >
                <div className="product-description__title">Chi tiết sản phẩm</div>
                <div
                    className="product-description__content"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
                <div className="product-description__toggle">
                    <Button
                        size="sm"
                        onClick={() => setDescriptionExpand(!descriptionExpand)}
                    >
                        {descriptionExpand ? "Thu gọn" : "Xem thêm"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};
const withLocation = (Component) => (props) => {
    const location = useLocation();

    return <Component {...props} location={location} />;
};
export default withLocation(ProductView);
