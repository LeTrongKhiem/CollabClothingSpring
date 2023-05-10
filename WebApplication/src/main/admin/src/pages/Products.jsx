import React, {useState, useEffect, useCallback, useRef} from "react";

import Table from "../components/table/Table";
import "./products.css"
import productsService from "../services/ProductsService";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import Categories from "../constants/Categories";
import Brands from "../constants/Brands";
import Select from "react-select";
import InventoryModal from "../components/modal/InventoryModal";

const customerTableHead = [{key: "number", label: "#"}, {key: "name", label: "products.name"},{key: "", label: "products.image"}, {
    key: "categoryNames",
    label: "products.categoryNames"
}, {key: "brandName", label: "products.brandName"}, {key: "priceOld", label: "products.priceOld"}, {
    key: "priceCurrent",
    label: "products.priceCurrent"
}, {key: "sale_off", label: "products.sale_off"}, {key: "consumer", label: "products.consumer"}, {
    key: "cotton",
    label: "products.cotton"
}, {key: "form", label: "products.form"}, {key: "type", label: "products.type"}, {
    key: "made_in",
    label: "products.made_in"
}, {key: "description", label: "products.description"}, {key: "isDeleted", label: "products.isDeleted"}, {
    key: "action",
    label: "products.action"
}];



const Products = () => {
    const [productList, setProductList] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryId, setCategoryId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [inventoryModal, setInventoryModal] = useState(false);
    const [productId, setProductId] = useState(null);
    const filterRef = useRef(null);
    const navigate = useNavigate();
    const renderBody = (item, index) => {
        const {
            name,
            productImages,
            brandName,
            categoryNames,
            consumer,
            cotton,
            form,
            description,
            priceCurrent,
            priceOld,
            sale_off,
            type,
            made_in,
            _deleted
        } = item;

        const thumbnail = productImages.filter((item) => item.thumbnail === true && item.deleted === false).map((item) => item.url)[0]

        const isDeleted = _deleted ? "Deleted" : "Active";
        const category = categoryNames.map((item, index) => {
            return <div key={index}>{item}</div>
        })
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>
                <img src={`http://localhost:6868/${thumbnail}`} alt={name} width="60px"/>
            </td>
            <td>{category}</td>
            <td>{brandName}</td>
            <td>{priceOld}</td>
            <td>{priceCurrent}</td>
            <td>{sale_off}%</td>
            <td>{consumer}</td>
            <td>{cotton}%</td>
            <td>{form}</td>
            <td>{type}</td>
            <td>{made_in}</td>
            <td>{description}</td>
            <td>{isDeleted}</td>
            <td>
                <Link to={`/products/${item.id}`} className="btn btn-primary">
                    <i className='bx bxs-edit-alt'></i>
                </Link>
                <Link to={`/products/images/${item.id}`} className="btn btn-primary">
                    <i className='bx bxs-image'></i>
                </Link>
                <div className="btn btn-danger">
                    <i className='bx bx-trash' onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) {
                            productsService.deleteProduct(item.id).then((res) => {
                                window.location.reload();
                            })
                        }
                    }}></i>
                </div>
                <div className="">
                    <i className='bx bx-store-alt' onClick={() => {
                        setProductId(item.id)
                        setInventoryModal(true)
                    }}></i>

                </div>





            </td>


        </tr>)

    }
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await productsService.getAllProducts(currentPage, pageSize, searchTerm, sortOrder, sortColumn, categoryId, brandId)
            setProductList(response.data.results);
            setTotalPages(Math.ceil(response.data.totalCount / pageSize)) //tổng số trang
            setLoading(false);
        };
        getProducts();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder, categoryId, brandId]);
    useEffect(() => {
        async function fetchCategories() {
            const data = await Categories();
            setCategory(data)
        }

        fetchCategories().then(r => {
            setLoading(false)
        });
    }, [])
    useEffect(() => {
        async function fetchBrands() {
            const data = await Brands();
            setBrand(data)
        }

        fetchBrands().then(r => {
            setLoading(false)
        });
    }, [])
    const categories = category.map((item) => {
        return {
            label: item.name, value: item.id
        }
    })
    const brands = brand.map((item) => {
        return {
            label: item.name, value: item.id
        }
    })

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page); //trừ 1 vì page bắt đầu từ 0
    }, []);
    const handleSort = useCallback((column) => {
        setSortColumn(column);
        if (sortOrder === 'asc') {
            setSortOrder('desc')
        } else {
            setSortOrder('asc')
        }
    }, [sortColumn, sortOrder]);
    const showHideFilter = () => filterRef.current.classList.toggle("active");
    const {t} = useTranslation();
    return (<>
        <div>
            <h2 className="page-header">
                {t('products.title')}
            </h2>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="card__body">
                            <div className="header__form">
                                <div className="user-register">
                                 <InventoryModal
                                    show={inventoryModal}
                                    onHide={() => setInventoryModal(false)}
                                    productId={productId}
                                />


                                    <button style={{
                                        margin: "10px 0px",
                                    }}>
                                        <Link to="/products/addProduct">
                                            <i className='bx bx-plus'></i>
                                        </Link>
                                    </button>
                                </div>
                                <div className="catalog__filter " ref={filterRef}>
                                    <div
                                        className="catalog__filter__close"
                                        onClick={() => showHideFilter()}
                                    >
                                        <i className="bx bx-right-arrow-alt"></i>
                                    </div>
                                    <div className="catalog__filter__widget">
                                        <div className="catalog__filter__widget__title">
                                            danh mục sản phẩm
                                        </div>
                                        <div className="catalog__filter__widget__content">
                                            <Select
                                                options={categories}
                                                onChange={(e) => {
                                                    setCategoryId(e.value);
                                                }
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="catalog__filter__widget">
                                        <div className="catalog__filter__widget__title">
                                            thương hiệu
                                        </div>
                                        <div className="catalog__filter__widget__content">
                                            <Select
                                                options={brands}
                                                onChange={(e)=> setBrandId(e.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="catalog__filter__widget">
                                        {/*<div className="catalog__filter__widget__content">*/}
                                        {/*    <button size="sm">*/}
                                        {/*        Xoá bộ lọc*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="catalog__filter__toggle">
                                    <button className="btn-toggle" onClick={() => showHideFilter()}>
                                        <i className='bx bx-filter-alt'></i>
                                    </button>
                                </div>
                            </div>

                            <div className="search-container">
                                <input
                                    type="search"
                                    placeholder="Tìm kiếm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                            </div>
                            {loading ? <div>Loading...</div> : (<Table
                                limit={pageSize}
                                headData={customerTableHead}
                                data={productList}
                                renderBody={(item, index) => renderBody(item, index)}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onChangePage={handlePageChange}
                                pageSize={pageSize}
                                sortColumn={sortColumn}
                                sortOrder={sortOrder}
                                onSort={handleSort}


                            />)}

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Products;
