import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import SelectField from "../../custom-fields/SelectField";
import "./createUserModal.css";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import CategoriesService from "../../services/CategoriesService";
import Select from "react-select";
import Categories from "../../constants/Categories";
function AddCategories({showModal, closeModal, setChanges}) {
    const [modal, setModal] = useState(showModal);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const initialState = {
        name: "", sortOrder: "", level: "", parentId: null, showWeb: true,
    };


    const handleSubmit = (values,{resetForm}) => {
        try {
            CategoriesService.addCategory(values).then((res) => {
                if (res.status === 200) {
                    setChanges(true)
                    resetForm({
                        values: initialState
                    });
                    closeModal();
                    toast.success("Thêm thành công", {
                        position: toast.POSITION.TOP_CENTER
                    });

                }
            }).catch((err) => {

                toast.error("Thêm thất bại", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
        }
        catch (e) {
            toast.error(e.errors)
        }
        // Xử lý gửi form tại đây

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



    return (


        <div className={`product-view__modal ${showModal ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={initialState}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}

                    >
                        {({
                                values,
                          }) => {
                            return (<Form>
                                <label htmlFor="name">Tên: </label>
                                <FastField
                                    name="name"
                                    component={InputField}
                                    placeholder="Tên"
                                    type="text"

                                />
                                <label htmlFor="sortOrder">SortOrder: </label>
                                <FastField
                                    name="sortOrder"
                                    component={InputField}
                                    placeholder="sortOrder"

                                />
                                <label htmlFor="level">Level: </label>
                                <FastField
                                    name="level"
                                    component={InputField}
                                    placeholder="Level"

                                />
                                <label htmlFor="parentId">Chọn danh mục : </label>
                                <Select
                                    name="parentId"
                                    options={categories}
                                    placeholder="Chọn danh mục"
                                    onChange={(e) => {
                                        values.parentId = e.value;
                                    }
                                    }
                                />
                                <div className="category-form-group">
                                    <label htmlFor="showWeb">Hiển thị trên web: </label>
                                    <FastField
                                        name="showWeb"
                                        component={InputField}
                                        placeholder="showWeb"
                                        type="checkbox"
                                        onChange={(e) => {
                                            values.showWeb = e.target.checked;
                                        }
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-register"
                                >
                                    Thêm
                                </button>
                            </Form>);
                        }}
                    </Formik>


                    <div className="product-view__modal__content__close">
                        <button onClick={closeModal}>
                            <i className="fas fa-times"></i>
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>)

}

export default AddCategories;