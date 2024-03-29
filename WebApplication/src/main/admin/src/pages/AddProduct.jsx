import React, {useState, useEffect} from "react";

import "./products.css"
import DropFileInput from "../components/drop-file-input/DropFileInput";
import Select from "react-select";
import Categories from "../constants/Categories";
import Brands from "../constants/Brands";
import {ErrorMessage, FastField, Field, Form, Formik} from "formik";
import InputField from "../custom-fields/InputField";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ProductsService from "../services/ProductsService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import Loading from "../components/loading/Loading";
import {useTranslation} from "react-i18next";

const consumerOptions = [
    {value: 1, label: 'Nam'},
    {value: 2, label: 'Nữ'},
    {value: 3, label: 'Trẻ em'},
    {value: 4, label: 'Unisex'},
];


const AddProduct = () => {
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
   const {t} = useTranslation();

    const initialValues = {
        name: '',
        priceOld: 0,
        priceCurrent: 0,
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
        form: '',


    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
        priceOld: Yup.number().required('Vui lòng nhập giá cũ'),
        priceCurrent: Yup.number().required('Vui lòng nhập giá hiện tại'),
        description: Yup.string().required('Vui lòng nhập mô tả'),
        category_id: Yup.array().min(1, 'Bạn phải chọn ít nhất một danh mục'),
        categoryNames: Yup.array().required('Vui lòng chọn danh mục'),
        brand_id: Yup.string().required('Vui lòng chọn thương hiệu'),
        brandName: Yup.string().required('Vui lòng chọn thương hiệu'),
        consumer: Yup.string().required('Vui lòng chọn đối tượng'),
        cotton: Yup.number().typeError('Vui lòng nhập số').required('Vui lòng nhập số lượng cotton'),
        made_in: Yup.string().required('Vui lòng nhập xuất xứ'),
        sale_off: Yup.number().required('Vui lòng nhập giảm giá'),
        type: Yup.string().required('Vui lòng nhập loại sản phẩm'),
        form: Yup.string().required('Vui lòng nhập hình thức sản phẩm'),


    })


    console.log(files)

    const onFileChange = (files) => {
        setFiles(files)
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
        setLoading(true)
        const data = new FormData();
        data.append('name', values.name)
        data.append('priceOld', values.priceOld)
        data.append('priceCurrent', values.priceCurrent)
        data.append('description', values.description)
        data.append('category_id', values.category_id)
        data.append('categoryNames', values.categoryNames)
        data.append('brand_id', values.brand_id)
        data.append('brandName', values.brandName)
        data.append('consumer', values.consumer)
        data.append('cotton', values.cotton)
        data.append('made_in', values.made_in)
        data.append('sale_off', values.sale_off)
        data.append('type', values.type)
        data.append('form', values.form)
        files.map((file, index) => {
            data.append(`file[${index}]`, file.file)
            data.append(`file[${index}]thumbnail`, file.isThumbnail)
        })

        try {
            const response = await ProductsService.saveProduct(data)
            if (response.status === 200) {
                toast.success(t("toast.success-add"), {
                    position: toast.POSITION.TOP_CENTER
                })
                setLoading(false)
                navigate('/products')

            } else {
                toast.error(t("toast.error-add"), {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        } catch (e) {
            console.log(e)
        }
    }
    if (loading) return <Loading/>
    return (<div>
        <h2 className="page-header">
            Quản lý sản phẩm
        </h2>
        <div className="row">
            <div className="col-12">

                <div className="card">
                    <div className="card__body">
                        <DropFileInput onFileChange={(files) => onFileChange(files)}/>
                    </div>
                </div>
                <div className="card">
                    <div className="card__body">
                        <Formik initialValues={initialValues} validationSchema={validationSchema}
                                onSubmit={values => saveProduct(values)}>
                            {({
                                  values,

                                  handleBlur,
                                  setFieldValue,
                                  setFieldTouched,
                                  setFieldError

                              }) => {
                                return (<Form>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên sản phẩm</label>
                                                <FastField name="name" component={InputField} type="text"
                                                           className="form-control" id="name"
                                                           placeholder="Nhập tên sản phẩm" htmlFor="name"/>
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="category_id">Danh Mục</label>
                                                <Select
                                                    name="category"
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
                                                <ErrorMessage name="category_id" className="error" component="div"/>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="priceOld">Giá cũ</label>
                                                <FastField name="priceOld" component={InputField}
                                                           type="number" className="form-control"
                                                           id="priceOld"/>
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
                                                <ErrorMessage name="brand_id" className="error" component="div"/>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="description">Mô tả</label>
                                                <Field name="description">
                                                    {({field}) => (
                                                        <div>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={field.value}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    setFieldValue('description', data);
                                                                }}
                                                                onBlur={() => {
                                                                    setFieldTouched('description', true);
                                                                    if (!field.value) {
                                                                        setFieldError('description', 'This field is required');
                                                                    } else {
                                                                        setFieldError('description', '');
                                                                    }
                                                                }}
                                                            />
                                                            <ErrorMessage name="description" component="div"
                                                                          className="error"/>
                                                        </div>
                                                    )}
                                                </Field>
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
