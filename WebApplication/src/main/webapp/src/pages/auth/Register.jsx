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
import Loading from "../../components/loading/Loading";
import {useTranslation} from "react-i18next";

const Register = () => {
    const {t} = useTranslation();
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
        firstName: Yup.string().required(t("auth.validate.firstName")),
        lastName: Yup.string().required(t("auth.validate.lastName")), // check day of birth
        dob: Yup.date()
            .nullable()
            .test("dob", t("auth.validate.dobYounger"), function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 13;
                return !valid ? ctx.createError() : valid;
            })
            .test("dob", t("auth.validate.dobOlder"), function (value, ctx) {
                const dob = new Date(value);
                const valid = dob.getFullYear() >= 1930;
                return !valid ? ctx.createError() : valid;
            })
            .required(t("auth.validate.dob")),

        phoneNumber: Yup.string().required(t("auth.validate.phone")).matches(/^(?:\+84|0)[3-9]\d{8}$/, t("auth.validate.phoneInvalid")),
        address: Yup.string().required(t("auth.validate.address")),
        email: Yup.string()
            .required(t("auth.validate.email")).email(t("auth.validate.emailInvalid")).matches(/@[^.]*\./)
            .test('Unique Email', t("auth.validate.emailExist"), // <- key, message
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
            .required(t("auth.validate.password"))
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", t("auth.validate.passwordInvalid")),
        confirmPassword: Yup.string()
            .required(t("auth.validate.confirmPassword"))
            .oneOf([Yup.ref("password")], t("auth.validate.confirmPasswordInvalid")),
        gender: Yup.number().required(t("auth.validate.gender")).nullable(),
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
                        <h2>{t("auth.register.title")}</h2>
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
                                            placeholder={t("auth.register.firstName")}

                                        />
                                        <FastField
                                            name="lastName"
                                            component={InputField}
                                            placeholder={t("auth.register.lastName")}

                                        />
                                        <FastField
                                            name="dob"
                                            component={InputField}
                                            placeholder={t("auth.register.dob")}
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
                                            placeholder={t("auth.register.gender.title")}
                                            options={[{value: "1", label: t("auth.register.gender.male")}, {
                                                value: "2",
                                                label: t("auth.register.gender.female")
                                            }, {value: "3", label: t("auth.register.gender.other")},]}
                                        />

                                        <FastField
                                            name="phoneNumber"
                                            component={InputField}
                                            placeholder={t("auth.register.phone")}
                                            isdate={false}
                                        />
                                        <FastField
                                            name="address"
                                            component={InputField}
                                            placeholder={t("auth.register.address")}

                                        />

                                        <FastField
                                            name="password"
                                            component={InputField}
                                            placeholder={t("auth.register.password")}
                                            type="password"

                                        />
                                        <FastField
                                            name="confirmPassword"
                                            component={InputField}
                                            placeholder={t("auth.register.confirmPassword")}
                                            type="password"

                                        />

                                        <Button
                                            type="button"
                                            loading={loading}
                                        >
                                            {loading ? "" : t("auth.register.register")}
                                        </Button>
                                    </Form>);
                            }}
                        </Formik>

                        <span className={styles.register}>
              <p>
               {t("auth.register.goToLogin")}{" "}
                  <Link to="/login">
                  <b> {t("auth.register.login")}</b>
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
