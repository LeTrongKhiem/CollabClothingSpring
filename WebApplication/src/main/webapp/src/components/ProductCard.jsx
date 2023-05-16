import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./UI/ButtonUI";
import numberWithCommas from "../utils/numberWithCommas";
import {set} from "../redux/slice/productModalSlice";

const ProductCard = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="product-card">
            <Link to={`/product/${props.id}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
            <del>{numberWithCommas(props.priceOld)}</del>
          </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(set(props.id))}
                >
                    chọn mua
                </Button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    img01: PropTypes.string,
    img02: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string,
};

export default ProductCard;
