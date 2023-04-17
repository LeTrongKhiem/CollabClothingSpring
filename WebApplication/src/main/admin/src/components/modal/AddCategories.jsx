import React, {useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import SelectField from "../../custom-fields/SelectField";
import "./createUserModal.css";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import Categories from "../../services/Categories";

function AddCategories({showModal, closeModal}) {
    const [modal, setModal] = useState(showModal);
    console.log(modal)
    const [formData, setFormData] = useState({
        name: "", sortOrder: "", level: "",  file: "", parentId: "", showWeb: "",
    });

    const initialState = {
        name: "", sortOrder: "", level: "",  file: "", parentId: "", showWeb: "",
    };


    const handleSubmit = (values,{resetForm}) => {
        try {
            Categories.addCategory(values).then((res) => {
                if (res.status === 200) {
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
        file: Yup.string().required("Vui lòng nhập file"),
        parentId: Yup.string().required("Vui lòng nhập parentId"),
        showWeb: Yup.string().required("Vui lòng nhập showWeb"),
        
    });


    return (


        <div className={`product-view__modal ${showModal ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={initialState}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}

                    >
                        {(formikProps) => {

                            return (<Form>
                                <FastField
                                    name="name"
                                    component={InputField}
                                    placeholder="Tên"
                                    type="text"

                                />

                                <FastField
                                    name="sortOrder"
                                    component={InputField}
                                    placeholder="sortOrder"

                                />
                                <FastField
                                    name="level"
                                    component={InputField}
                                    placeholder="Level"

                                />
                                <FastField
                                    name="file"
                                    component={InputField}
                                    placeholder="File"
                                    type="file"
                                />
                                <FastField
                                    name="showWeb"
                                    component={InputField}
                                    placeholder="showWeb"
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

export default AddCategories;