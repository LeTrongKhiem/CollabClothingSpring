import React, {useState, useEffect} from "react";

import Table from "../components/table/Table";
import "./products.css"
import DropFileInput from "../components/drop-file-input/DropFileInput";
import Select from "react-select";
import Categories from "../constants/Categories";
import Brands from "../constants/Brands";
import {FastField, Form, Formik} from "formik";
import InputField from "../custom-fields/InputField";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ProductsService from "../services/ProductsService";
import {toast} from "react-toastify";

const customerTableHead = [{key: "number", label: "#"}, {key: "email", label: "customers.email"}, {
    key: "lastName", label: "customers.lastName"
}, {key: "firstName", label: "customers.firstName"}, {key: "dob", label: "customers.dob"}, {
    key: "gender", label: "customers.gender"
}, {key: "phoneNumber", label: "customers.phone"}, {key: "address", label: "customers.address"}, {
    key: "emailVerified", label: "customers.emailVerified"
}, {key: "role", label: "customers.role"},];
const renderBody = (item, index) => {
    const {email, lastName, firstName, dob, gender, phoneNumber, address, emailVerified, role, block} = item;
    const date = new Date(dob);
    const formatDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const verify = emailVerified ? "Đã xác thực" : "Chưa xác thực";

    const formatGender = () => {
        if (gender === 1) {
            return "Nam"
        } else if (gender === 2) {
            return "Nữ"
        } else {
            return "Khác"
        }

    }
    return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{email}</td>
        <td>{lastName}</td>
        <td>{firstName}</td>
        <td>{formatDate}</td>
        <td>{formatGender()}</td>
        <td>{phoneNumber}</td>
        <td>{address}</td>
        <td>{verify}</td>
        <td>{role}</td>


    </tr>)

}
const  consumerOptions = [
    { value: 1, label: 'Nam' },
    { value: 2, label: 'Nữ' },
    {value:  3, label: 'Trẻ em'},
    { value: 4, label: 'Unisex' },
];


const AddProduct = () => {
    const initialValues = {
        name: '',
        priceOld: 0,
        priceCurrent: '',
        description: '',
        category_id: [],
        categoryNames: [],
        brand_id: '',
        brandName: '',
        consumer: 0,
        cotton: 0,
        made_in: '',
        sale_off: '',
        type: '',


    }
    const [productList, setProductList] = useState(initialValues);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const onFileChange = (files) => {
        console.log(files);
    }

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
    const saveProduct = async (values) => {
        try {
            const response = await ProductsService.saveProduct(values);
            if (response.status === 200) {
                toast.success("Thêm sản phẩm thành công", {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error("Thêm sản phẩm thất bại", {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (<div>
        <h2 className="page-header">
            Quản lý sản phẩm
        </h2>
        <div className="row">
            <div className="col-12">

                <div className="card">
                    <div className="card__body">
                        <DropFileInput onFileChange={(files) => onFileChange(files)}/>
                        {/*<div className="search-container">*/}
                        {/*  <input*/}
                        {/*      type="search"*/}
                        {/*      placeholder="Tìm kiếm"*/}
                        {/*      value={searchTerm}*/}
                        {/*      onChange={(e) => setSearchTerm(e.target.value)}*/}
                        {/*  />*/}

                        {/*</div>*/}
                        {/*{loading ? <div>Loading...</div> : (*/}
                        {/*    <Table*/}
                        {/*        limit={2}*/}
                        {/*        headData={customerTableHead}*/}
                        {/*        data={productList}*/}
                        {/*        renderBody={(item, index) => renderBody(item, index)}*/}

                        {/*    />*/}
                        {/*)}*/}

                    </div>
                </div>
                <div className="card">
                    <div className="card__body">
                        <Formik initialValues={initialValues} onSubmit={values => saveProduct(values)}>
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  setFieldValue
                              }) => {
                                console.log(values)
                                return (<Form>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên sản phẩm</label>
                                                {/*<input type="text" className="form-control" id="name"*/}
                                                {/*       placeholder="Nhập tên sản phẩm"/>*/}
                                                <FastField name="name" component={InputField} type="text"
                                                           className="form-control" id="name"
                                                           placeholder="Nhập tên sản phẩm" htmlFor="name"/>
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Danh Mục</label>
                                                <Select
                                                    name="category_id"
                                                    options={categories}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                    value={categories.filter((option) => values.category_id.includes(option.value))}
                                                    onChange={(selectedOptions) => {
                                                        // Lấy label và value của các lựa chọn được chọn
                                                        const labels = selectedOptions.map((option) => option.label);
                                                        const values = selectedOptions.map((option) => option.value);

                                                        // Cập nhật giá trị category_id và categoryNames trong form values
                                                        setFieldValue('category_id', values);
                                                        setFieldValue('categoryNames', labels);
                                                    }}
                                                    onBlur={handleBlur('category_id')}
                                                    isMulti
                                                    placeholder={'Chọn danh mục'}
                                                />


                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="priceOld">Giá cũ</label>
                                                <FastField name="priceOld" component={InputField} type="number"
                                                           className="form-control" id="priceOld"/>


                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="priceCurrent">Giá mới</label>
                                                <FastField name="priceCurrent" component={InputField}
                                                           type="number" className="form-control"
                                                           id="priceCurrent"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="sale_off">Giảm giá</label>
                                                <FastField name="sale_off" component={InputField} type="number"
                                                           className="form-control" id="sale_off"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="cotton">Cotton</label>
                                                <FastField name="cotton" component={InputField} type="number"
                                                           className="form-control" id="cotton"/>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="form"> Form</label>

                                                <FastField name="form" component={InputField} type="text"
                                                           className="form-control" id="form"/>
                                            </div>
                                        </div>


                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="type">Loại</label>
                                                <FastField name="type" component={InputField} type="text"
                                                           className="form-control" id="type"/>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="consumer">Người tiêu dùng</label>
                                                <Select
                                                    name="consumer"
                                                    options={consumerOptions

                                                    }

                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                    defaultValue={consumerOptions[0]}
                                                    onChange={(e) => {
                                                        const values = e.value;

                                                        setFieldValue('consumer', values);

                                                    }
                                                    }
                                                    onBlur={handleBlur('consumer')}
                                                    placeholder={'Chọn người tiêu dùng'}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="madeIn">Xuất xứ</label>
                                                <FastField name="made_in" component={InputField} type="text"
                                                           className="form-control" id="made_in"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="brand">Thương hiệu</label>
                                                <Select
                                                    name="brand_id"
                                                    options={brands}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                    defaultValue={brands[0]}
                                                    onChange={(e) => {
                                                        // Lấy label và value của các lựa chọn được chọn
                                                        const labels = e.label;
                                                        const values = e.value;

                                                        // Cập nhật giá trị category_id và categoryNames trong form values
                                                        setFieldValue('brand_id', values);
                                                        setFieldValue('brandName', labels);

                                                    }
                                                    }
                                                    onBlur={handleBlur('brand_id')}

                                                    placeholder={'Chọn thương hiệu'}

                                                />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={values.description}

                                                    style={{height: '500px !important'}}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setFieldValue('description', data);

                                                    }
                                                    }
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <button type="submit" className="btn-submit">Lưu</button>
                                </Form>)
                            }}


                        </Formik>


                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default AddProduct;
