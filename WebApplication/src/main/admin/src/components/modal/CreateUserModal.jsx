import React, {useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import SelectField from "../../custom-fields/SelectField";
import "./createUserModal.css";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";

function CreateUserModal({showModal, closeModal}) {
    const [modal, setModal] = useState(showModal);
    console.log(modal)
    const [formData, setFormData] = useState({
        name: '', email: '', message: ''
    });

    const initialState = {
        userName: "", firstName: "", lastName: "", dob: "", phoneNumber: "", address: "", email: "", gender: "",
    };


    const handleSubmit = (values,{resetForm}) => {
        try {
            UserService.createUser(values).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    resetForm({
                        values: initialState
                    });
                    closeModal();
                    toast.success("Tạo tài khoản thành công", {
                        position: toast.POSITION.TOP_CENTER
                    });

                }
            }).catch((err) => {

                toast.error("Tạo tài khoản thất bại", {
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
        firstName: Yup.string().required("Vui lòng nhập tên"),
        lastName: Yup.string().required("Vui lòng nhập họ"), // check day of birth
        dob: Yup.date()
            .nullable()
            .test("dob", "Khách hàng phải trên 14 tuổi", function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 13;
                return !valid ? ctx.createError() : valid;
            })
            .test("dob", "Năm sinh phải lớn hơn 1930 ", function (value, ctx) {
                const dob = new Date(value);
                const valid = dob.getFullYear() >= 1930;
                return !valid ? ctx.createError() : valid;
            })
            .required("Vui lòng nhập ngày sinh"),

        phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại").matches(/^(?:\+84|0)[3-9]\d{8}$/, "Số điện thoại không hợp lệ"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        email: Yup.string()
            .required('Vui lòng nhập email').email('Email không hợp lệ').matches(/@[^.]*\./)
            .test('Unique Email', 'Email đã tồn tại', async function (value) {

                return await UserService.checkEmailExist(value)
                    .then((res) => {
                        console.log(res)
                        if (res.data) {
                            return false;
                        }
                        return true;
                    })
                    .catch((err) => {
                        console.log(err)
                        return true;
                    });
            }),


        gender: Yup.number().required("Vui lòng chọn giới tính").nullable(),
    });


    return (


        <div className={`product-view__modal ${showModal ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <h2>Đăng ký</h2>
                    <Formik
                        initialValues={initialState}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}

                    >
                        {(formikProps) => {

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
                                        value: "2", label: "Nữ"
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


                                <button
                                    type="submit"
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
        </div>)

}

export default CreateUserModal;