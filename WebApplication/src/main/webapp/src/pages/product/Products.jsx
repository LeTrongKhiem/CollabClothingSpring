import React, {useCallback, useEffect, useState, useRef} from "react";
import Helmet from "../../components/Helmet";
// import sizes from "../assets/fake-data/product-size";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/UI/ButtonUI";
import InfinityList from "../../components/InfinityList";
import ProductService from "../../services/ProductService";
import {colorOptions} from "../../constants/Colors";
import {sizeOptions} from "../../constants/Sizes";
import {categoryOptions} from "../../constants/Categories";
import Select from "react-select";
import {brandOptions} from "../../constants/Brands";

const Catalog = () => {
    const sortOptions = [
        {value: "name", label: "Tên sản phẩm"},
        {value: "price", label: "Giá"},
        {value: "createdAt", label: "Ngày tạo"},
    ];
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryId, setCategoryId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [colorId, setColorId] = useState(null);
    const [sizeId, setSizeId] = useState(null);

    const filterRef = useRef(null);
    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            const response = await ProductService.getAllProducts(currentPage, pageSize, searchTerm, sortOrder, sortColumn, categoryId, brandId, colorId, sizeId);
            setProducts(response.data.results);
            setTotalPages(Math.ceil(response.data.totalCount / pageSize)) //tổng số trang
            setIsLoading(false);
        };
        getProducts();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder, categoryId, brandId, colorId, sizeId]);
    useEffect(() => {
        colorOptions().then((res) => {
            setColors(res)
        })
        sizeOptions().then((res) => {
            setSizes(res)
        })
        categoryOptions().then((res) => {
            setCategories(res)
        })
        brandOptions().then((res) => {
            setBrands(res)
        })


    }, [])
    const handleColorChange = (value) => {
        if (value === colorId) {
            setColorId(null);
        } else {
            setColorId(value);
        }
    }
    const handleSortChange = (value) => {
        setSortColumn(value.value);

    }
    const handleSortOrderChange = (value) => {

    }
    const handleSizeChange = (value) => {
        if (value === sizeId) {
            setSizeId(null);
        } else {
            setSizeId(value);
        }
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided, width: 200,
        }),
    };
    const [value, setValue] = useState(null)
    const [valueBrand, setValueBrand] = useState(null)
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setValue(selectedOption)
            setCategoryId(selectedOption.value)
        } else {
            setValue(null)
            setCategoryId(null)
        }

    };
    const handleBrandChange = (selectedOption) => {
        if (selectedOption) {
            setValueBrand(selectedOption)
            setBrandId(selectedOption.value)
        } else {
            setValueBrand(null)
            setBrandId(null)
        }

    };
    const clearFilter = () => {
        setColorId(null);
        setSizeId(null)
        setCategoryId(null);
        setValue(null)

    };
    const showHideFilter = () => filterRef.current.classList.toggle("active");
    return (<Helmet title="Sản phẩm">
        <div className="catalog">
            <div className="catalog__filter " ref={filterRef}>
                <div
                    className="catalog__filter__close"
                    onClick={() => showHideFilter()}
                >
                    <i className="bx bx-left-arrow-alt"></i>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">
                        danh mục sản phẩm
                    </div>
                    <div className="catalog__filter__widget__content">
                        <Select
                            options={categories}
                            onChange={handleSelectChange}
                            value={value}
                            placeholder="Danh mục sản phẩm"
                            isClearable={true}
                            styles={customStyles}
                        />

                    </div>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">
                        Thương hiệu
                    </div>
                    <div className="catalog__filter__widget__content">
                        <Select
                            options={brands}
                            onChange={handleBrandChange}
                            value={valueBrand}
                            placeholder="Thương hiệu"
                            isClearable={true}
                            styles={customStyles}
                        />

                    </div>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">màu sắc</div>
                    <div className="catalog__filter__widget__content">
                        {colors.map((item, index) => (<div
                            key={index}
                            className="catalog__filter__widget__content__item"
                        >
                            <Checkbox
                                label={item.label}
                                name="color"
                                onClick={() => handleColorChange(item.value)}
                                onChange={() => handleColorChange(item.value)}
                                checked={item.value === colorId}
                            />
                        </div>))}
                    </div>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">Kích cỡ</div>
                    <div className="catalog__filter__widget__content">
                        {sizes.map((item, index) => (<div
                            key={index}
                            className="catalog__filter__widget__content__item"
                        >
                            <Checkbox
                                label={item.label}
                                name="size"
                                onChange={() => {
                                    setSizeId(item.value)
                                }}
                                onClick={() => {
                                    handleSizeChange(item.value)
                                }}
                                checked={item.value === sizeId}
                            />
                        </div>))}
                    </div>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__content">
                        <Button size="sm" onClick={clearFilter}>
                            Xoá bộ lọc
                        </Button>
                    </div>
                </div>
            </div>
            <div className="catalog__filter__toggle">
                <Button size="sm" onClick={() => showHideFilter()}>
                    bộ lọc
                </Button>
            </div>
            <div className="catalog__content">
                <div className="catalog__content__action">
                <div className="catalog__content__search">
                    <i className='bx bx-search'></i>
                    <input type="search" placeholder="Tìm kiếm sản phẩm" value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <div className="catalog__content__sort">
                        <Select
                            options={sortOptions}
                            onChange={handleSortChange}
                            placeholder="Sắp xếp theo"
                            isClearable={true}
                            styles={customStyles}
                        />
                </div>
                </div>
                {isLoading && <div>Loading</div>}
                <InfinityList data={products}/>
            </div>
        </div>
    </Helmet>);
};

export default Catalog;
