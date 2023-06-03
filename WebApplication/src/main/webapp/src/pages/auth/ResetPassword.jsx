import React, {useEffect, useState} from "react";
import styles from "./auth.module.scss";
import Helmet from "../../components/Helmet";
import Card from "../../components/UI/Card";
import {FastField, Formik, Form} from "formik";
import InputField from "../../custom-fields/InputField";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useTranslation} from "react-i18next";

const ResetPassword = () => {
    const [token, setToken] = useState(null);
    const {t} = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setToken(searchParams.get("code"));
    }, [token]);
    const resetPassword = async (values) => {
        try {
            const checkToken = await UserService.checkTokenForResetPassword(token);
            console.log(checkToken);
            if (checkToken.status === 200) {
                const response = await UserService.changePassword({
                    token: token,
                    newPassword: values.newPassword,
                });
                if (response.status === 200) {
                    toast.success("Đặt lại mật khẩu thành công");
                    navigate("/login");
                }
            } else {
                toast.error("Đặt lại mật khẩu thất bại");
            }

        } catch (error) {
            toast.error("Đặt lại mật khẩu thất bại");
        }
    }
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                t("auth.validate.password")
            ),
        confirmPassword: Yup.string()
            .required( t("auth.validate.confirmPassword") + "")
            .oneOf([Yup.ref("newPassword")], t("auth.validate.confirmPasswordInvalid") + ""),
    });

    return (
        <>
            <Helmet title="Reset Password"/>
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    {/*<img src={resetImg} alt="Reset Password" width="400" />*/}
                </div>

                <Card>
                    <div className={styles.form}>
                        <h2>{t("auth.resetPassword.title")}</h2>
                        <Formik
                            initialValues={{
                                newPassword: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                resetPassword(values).then(r => console.log(r));
                            }}
                        >
                            {(props) => {


                                return (
                                    <Form>
                                        <FastField
                                            name="newPassword"
                                            component={InputField}
                                            placeholder="Mật khẩu mới"
                                            type="password"
                                        />
                                        <FastField
                                            name="confirmPassword"
                                            component={InputField}
                                            placeholder="Nhập lại mật khẩu mới"
                                            type="password"
                                        />

                                        <button
                                            type="submit"
                                            className="--btn --btn-primary --btn-block"
                                        >
                                            Xác nhận
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default ResetPassword;
