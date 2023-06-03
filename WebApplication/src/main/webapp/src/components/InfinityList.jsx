import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import Grid from "./UI/Grid";

const InfinityList = (props) => {
    const perload = 3;
    const [data, setData] = useState([]);
    const listRef = useRef(null);
    const [load, setLoad] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setData(props.data.slice(0, perload));
        setIndex(1);
    }, [props.data]);
    const handleScroll = () => {
        if (listRef && listRef.current) {
            if (
                window.scrollY + window.innerHeight >=
                listRef.current.clientHeight + listRef.current.offsetTop + 200
            ) {
                console.log("load more");
                setLoad(true);
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [listRef]);
    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(props.data.length / perload);
            const maxIndex = props.data.length % perload === 0 ? pages : pages + 1;
            if (load && index <= maxIndex) {
                const start = index * perload;
                const end = start + perload;
                setData([...data, ...props.data.slice(start, end)]);
                setIndex(index + 1);
            }
        };
        getItems();
        setLoad(false);
    }, [load, index, data, props.data]);
    if(data.length === 0){
        return  <div>
            <div className="catalog__content__emty">Không có sản phẩm nào</div>
        </div>
    }
    return (
        <>
            <div ref={listRef}>
                <Grid col={3} mdCol={2} smCol={1} gap={20}>

                    {data.map((item, index) => {
                            const thumbnailImage = item.productImages.find(
                                (image) => image.thumbnail === true
                            );
                            return (
                                <ProductCard
                                    key={index}
                                    img01={thumbnailImage.url ? thumbnailImage.url : item.productImages[0].url}
                                    img02={item.productImages.length > 1 ? item.productImages[1].url : null}
                                    name={item.name}
                                    price={Number(item.priceCurrent)}
                                    priceOld={Number(item.priceOld)}
                                    id={item.id}
                                />)
                        }
                    )}
                </Grid>
            </div>
        </>
    );
};

InfinityList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default InfinityList;
