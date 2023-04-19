import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import "./categoriesEdit.css";
import {toast} from "react-toastify";
import CategoriesService from "../../services/CategoriesService";
import Select from "react-select";
import Categories from "../../constants/Categories";

function EditCategories({showModalEdit, closeModalEdit, setChanges, categoryId}) {
    const initialState = {
            id: "",
            level: "",
            name: "",
            parentId: null,
            pathIcon: "",
            showWeb: "",
            sortOrder: "",
        }
    ;
    const [modal, setModal] = useState(showModalEdit);
    const [category, setCategory] = useState([]);
    const [categoryEdit, setCategoryEdit] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (values) => {
        try {
            CategoriesService.updateCategory(categoryId,values).then((res) => {
                if (res.status === 200) {
                    setChanges(true)
                    closeModalEdit();
                    toast.success("Sửa thành công", {
                        position: toast.POSITION.TOP_CENTER
                    });

                }
            }).catch((err) => {

                toast.error("Thêm thất bại", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
        } catch (e) {
            toast.error(e.errors)
        }

    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên"),
        sortOrder: Yup.string().required("Vui lòng nhập sortOrder"),
        level: Yup.string().required("Vui lòng nhập level"),
        parentId: Yup.string().required("Vui lòng nhập parentId").nullable(),
        showWeb: Yup.string().required("Vui lòng nhập showWeb"),

    });
    useEffect(() => {
        async function fetchCategories() {
            const data = await Categories();
            setCategory(data)
        }

        fetchCategories().then(r => {
            setLoading(false)
        });
    }, []);
    const categories = category.map((item) => {
        return {
            label: item.name, value: item.id
        }
    })

    useEffect(() => {
        if (categoryId === null) {
            setLoading(false)
            return;
        }
        async function fetchCategory() {
            const response = await CategoriesService.getCategoryById(categoryId);
            setCategoryEdit(response.data)
            setLoading(false)
        }

        fetchCategory().then(r => {
            setLoading(false)
        });
    }, [categoryId])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div className={`product-view__modal ${showModalEdit ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={categoryEdit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        validateOnChange={true}
                        onSubmit={handleSubmit}

                    >
                        {({
                              values,
                              handleBlur,
                              setFieldValue,
                              setFieldTouched,
                              setFieldError
                          }) => {

                            console.log(values)
                            return (<Form>
                                <label htmlFor="name">Tên Danh Mục: </label>
                                <FastField
                                    name="name"
                                    component={InputField}
                                    placeholder="Tên danh mục"
                                    value={values.name}
                                    htmlFor="name"

                                />

                                <label htmlFor="sortOrder">SortOrder: </label>
                                <FastField
                                    name="sortOrder"
                                    component={InputField}
                                    placeholder="sortOrder"
                                    value={values.sortOrder}
                                    htmlFor="sortOrder"

                                />
                                <label htmlFor="level">Level: </label>
                                <FastField
                                    name="level"
                                    component={InputField}
                                    placeholder="Level"
                                    value={values.level}
                                    htmlFor="level"
                                />
                                <label htmlFor="parentId">Danh mục cha : </label>
                                <Select
                                    name="parentId"
                                    options={categories}
                                    placeholder="Danh mục cha "
                                    value={categories.find(obj => obj.value === values.parentId)}
                                    htmlFor="parentId"
                                />
                                <div className="category-form-group">
                                    <label htmlFor="showWeb">Hiển thị trên web: </label>
                                    <FastField
                                        name="showWeb"
                                        component={InputField}
                                        placeholder="showWeb"
                                        type="checkbox"
                                        isChecked={values.showWeb}
                                        htmlFor="showWeb"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-register"
                                >
                                    Xác nhận
                                </button>
                            </Form>);
                        }}
                    </Formik>


                    <div className="product-view__modal__content__close">
                        <button onClick={closeModalEdit}>
                            <i className="fas fa-times"></i>
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>)

}

export default EditCategories;