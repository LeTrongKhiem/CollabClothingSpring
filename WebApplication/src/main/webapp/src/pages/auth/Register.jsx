import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Card from "../../components/UI/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/images/register.png";
import Helmet from "../../components/Helmet";
import {toast} from "react-toastify";
import Select from "react-select";
import UserService from "../../services/UserService";
import {FastField, Form, Formik} from "formik";
import InputField from "../../custom-fields/InputField";
import * as Yup from "yup";
import SelectField from "../../custom-fields/SelectField";
import axios from "axios";
import Button from "../../components/UI/Button";

const Register = () => {
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
    const [loading, setLoading] = useState(false);
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
        address: Yup.string().required("Vui lòng nhập địa chỉ"), // check email exist
        email: Yup.string()
            .required('Vui lòng nhập email').email('Email không hợp lệ').matches(/@[^.]*\./)
            .test('Unique Email', 'Email đã tồn tại', // <- key, message
                async function (value) {

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


        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"),
        confirmPassword: Yup.string()
            .required("Vui lòng nhập lại mật khẩu")
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
        gender: Yup.number().required("Vui lòng chọn giới tính").nullable(),
    });
    const navigate = useNavigate();
    const registerUser = (values) => {
        setLoading(true);
        UserService.saveUser(values)
            .then((res) => {
                toast.success("Đang ký thành công vui kiểm tra email để kích hoạt tài khoản");
                navigate("/login");
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (<Helmet title={"Đăng ký"}>
            <section className={` container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Đăng ký</h2>
                        <Formik
                            initialValues={initialState}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                registerUser(values);
                            }}
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

                                        <Button
                                            type="button"
                                            loading={loading}
                                        >
                                            {loading ? "" : "Đăng ký"}
                                        </Button>
                                    </Form>);
                            }}
                        </Formik>

                        <span className={styles.register}>
              <p>
                Bạn đã có tài khoản ?{" "}
                  <Link to="/login">
                  <b>Đăng nhập</b>
                </Link>
              </p>
            </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Register" width="400"/>
                </div>
            </section>
        </Helmet>);
};

export default Register;
