import React, { useState } from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import SelectField from "../../custom-fields/SelectField";
import "./createUserModal.css";
function CreateUserModal({ showModal, closeModal }) {
   const [modal, setModal] = useState(showModal);
    console.log(modal)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const initialState = {
        userName: "",
        firstName: "",
        lastName: "",
        dob: "",
        phoneNumber: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi form tại đây

    };
    console.log(showModal)


    return (


        <div className={`product-view__modal ${showModal  ?  "active" : "" }`}>

            <div className="product-view__modal__content auth" >
                <div  className="form">
                    <h2>Đăng ký</h2>
                    <Formik
                        initialValues={initialState}


                    >
                        {(formikProps) => {
                            const {values, errors, touched} = formikProps;
                            console.log(values)
                            return (<Form>
                                <FastField
                                    name="email"
                                    component={InputField}
                                    placeholder="Email"
                                    type="email"

                                />

                                <FastField
                                    name="firstName"
                                    component={InputField}
                                    placeholder="Họ"

                                />
                                <FastField
                                    name="lastName"
                                    component={InputField}
                                    placeholder="Tên"

                                />
                                <FastField
                                    name="dob"
                                    component={InputField}
                                    placeholder="Ngày sinh"
                                    isdate={true}
                                    type="text"
                                />
                                <FastField
                                    name="gender"
                                    component={SelectField}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? "" : "#777",
                                            color: "#777",
                                            fontSize: "16px",
                                        }),
                                    }}
                                    placeholder="Giới tính"
                                    options={[{value: "1", label: "Nam"}, {
                                        value: "2",
                                        label: "Nữ"
                                    }, {value: "3", label: "Khác"},]}
                                />

                                <FastField
                                    name="phoneNumber"
                                    component={InputField}
                                    placeholder="Số điện thoại"
                                    isdate={false}
                                />
                                <FastField
                                    name="address"
                                    component={InputField}
                                    placeholder="Địa chỉ"

                                />

                                <FastField
                                    name="password"
                                    component={InputField}
                                    placeholder="Mật khẩu"
                                    type="password"

                                />
                                <FastField
                                    name="confirmPassword"
                                    component={InputField}
                                    placeholder="Nhập lại mật khẩu"
                                    type="password"

                                />

                                <button
                                    type="button"
                                    className="btn-register"
                                >
                                    Đăng ký
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
        </div>
    )

}

export default CreateUserModal;