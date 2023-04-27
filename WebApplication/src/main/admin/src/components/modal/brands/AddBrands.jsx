import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../../custom-fields/InputField/index";
import "../createUserModal.css";
import {toast} from "react-toastify";
import BrandsService from "../../../services/BrandsService";
function AddBrands({showModal, closeModal, setChanges}) {
    const [modal, setModal] = useState(showModal);
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);

    const initialState = {
        name: "", description: "", pathLogo: ""
    };


    const handleSubmit = (values,{resetForm}) => {
        try {
            BrandsService.addBrand(values).then((res) => {
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
        description: Yup.string().required("Vui lòng nhập mô tả"),
        pathLogo: Yup.string().required("Vui lòng nhập pathLogo"),


    });

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
                            console.log(values)
                            return (<Form>
                                <label htmlFor="name">Tên: </label>
                                <FastField
                                    name="name"
                                    component={InputField}
                                    placeholder="Tên"
                                    type="text"

                                />
                                <label htmlFor="Path Logo">Path Logo: </label>
                                <FastField
                                    name="pathLogo"
                                    component={InputField}
                                    placeholder="Path Logo"

                                />
                                <label htmlFor="description">Mô tả </label>
                                <FastField
                                    name="description"
                                    as="textarea"
                                    style={{height: "100px", width: "100%"}}
                                />

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

export default AddBrands;