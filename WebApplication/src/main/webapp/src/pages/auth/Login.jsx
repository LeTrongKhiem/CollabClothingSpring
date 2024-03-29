import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Helmet from "../../components/Helmet";
import Section from "../../components/UI/Section";
import Card from "../../components/UI/Card";
import styles from "./auth.module.scss";
import loginImg from "../../assets/images/login.png";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import {FastField, Form, Formik} from "formik";
import InputField from "../../custom-fields/InputField";
import * as Yup from "yup" ;
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../redux/slice/authSlice";
import Button from "../../components/UI/Button";
import jwtDecode from 'jwt-decode';
import {selectPreviousURL} from "../../redux/slice/cartItemsSlice";
import Loading from "../../components/loading/Loading";
import {useTranslation} from "react-i18next";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required(t("auth.login.validate.email")).email(t("auth.login.validate.emailInvalid")).matches(/@[^.]*\./),
        password: Yup.string()
            .required(t("auth.login.validate.password"))
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                t("auth.login.validate.passwordInvalid")
            ),
    });


    const navigate = useNavigate();
    const prevURL = useSelector(selectPreviousURL);
    const redirectUser = () => {
        if (prevURL.includes("cart")) {
            navigate("/cart");
        } else {
            navigate("/");
        }
    }
    const loginUser = (value) => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // Nếu token đã hết hạn, xoá token và đăng nhập lại trước khi gửi yêu cầu đăng nhập mới
                localStorage.removeItem("token");
                toast.error("Token đã hết hạn, vui lòng đăng nhập lại");
                navigate("/login");
                return;
            }
        }

        // Gửi yêu cầu đăng nhập mới
        UserService.login(value)
            .then((res) => {

                if (res.status === 200) {
                    toast.success("Đăng nhập thành công");
                    localStorage.setItem("token", res.data.token);
                    redirectUser()
                    dispatch(loginSuccess(res.data));
                }
            })
            .catch((err) => {
                toast.error("Đăng nhập thất bại");
            });
    };


    return (<>
        <Helmet title={"Đăng nhập"}>
            {loading && <Loading/>}
            <Section>
                <section className={` container ${styles.auth}`}>
                    <div className={styles.img}>
                        <img src={loginImg} alt="Login" width="400"/>
                    </div>
                    <Card>
                        <div className={styles.form}>
                            <h2>{t("auth.login.title")}</h2>
                            <Formik initialValues={{
                                email: "", password: ""
                            }} validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        loginUser(values);
                                    }}>
                                <Form>
                                    <FastField name="email" component={InputField} placeholder="Email"/>
                                    <FastField name="password" component={InputField} placeholder={t("auth.login.password")}
                                               type="password"/>

                                    <Button
                                        loading={loading}
                                        type="submit"
                                    >
                                        {loading ? "" : t("auth.login.login")}

                                    </Button>
                                    <div className={styles.links}>
                                        <Link to="/reset">{t("auth.login.forgot")}</Link>
                                    </div>
                                    <p>-- or --</p>
                                </Form>
                            </Formik>
                            <button
                                type="submit"
                                className="--btn --btn-block"


                            >
                                <i className="bx bxl-google"></i>
                                {t("auth.login.loginWith")} Google
                            </button>
                            <span className={styles.register}>
                <p>
                  {t("auth.login.goToRegister")} &nbsp;
                    <Link to="/register">
                    <b>{t("auth.login.register")}</b>
                  </Link>
                </p>
              </span>
                        </div>
                    </Card>
                </section>
            </Section>
        </Helmet>
    </>)
};

export default Login;
