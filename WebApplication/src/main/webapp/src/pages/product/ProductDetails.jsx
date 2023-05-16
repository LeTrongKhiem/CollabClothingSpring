import Helmet from "../../components/Helmet";
import Section, {SectionBody, SectionTitle} from "../../components/UI/Section";
import React, {useEffect, useState} from "react";
import {getProductByBrand, getProductById} from "../../customHooks/ProductsAPI";
import {useParams} from "react-router-dom";
import ProductView from "../../components/ProductView";
import Grid from "../../components/UI/Grid";
import ProductCard from "../../components/ProductCard";


const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productsBrand, setProductsBrand] = useState([]);
    console.log(productsBrand)
    const relatedProducts = productsBrand.filter((item) => item.id !== product.id)
    const params = useParams();
    const {id} = params;
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res);
                const resBrand = await getProductByBrand(10,product.brand_id);
                setProductsBrand(resBrand.results);
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setIsLoading(false);
            }
        }
           fetchData();


    }, [id]);
    return (
        <Helmet title={product.name}>
            <Section>
                <SectionBody>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <ProductView product={product}/>
                    )}
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản pẩm cùng thương hiệu</SectionTitle>
                <SectionBody>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {relatedProducts.map((item, index) => {
                                const thumbnailImage = item.productImages.find(
                                    (image) => image.thumbnail === true
                                );
                                return (

                                    <ProductCard
                                        key={index}
                                        img01={`/${thumbnailImage.url ? thumbnailImage.url : item.productImages[0].url}`}
                                        img02={`/${item.productImages.length > 1 ? item.productImages[1].url : null}`}
                                        name={item.name}
                                        price={Number(item.priceCurrent)}
                                        priceOld={Number(item.priceOld)}
                                        id={item.id}
                                    />)
                            })}
                        </Grid>
                    )
                    }

                </SectionBody>
            </Section>

        </Helmet>
    )
}
export default ProductDetails;