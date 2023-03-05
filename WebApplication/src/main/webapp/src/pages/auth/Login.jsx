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
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../redux/slice/authSlice";
import Button from "../../components/UI/Button";
import jwtDecode from 'jwt-decode';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ").matches(/@[^.]*\./),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
            ),
    });


    const navigate = useNavigate();

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
                    navigate("/");
                    dispatch(loginSuccess(res.data));
                }
            })
            .catch((err) => {
                toast.error("Đăng nhập thất bại");
            });
    };


    return (<>
        <Helmet title={"Đăng nhập"}>
            <Section>
                <section className={` container ${styles.auth}`}>
                    <div className={styles.img}>
                        <img src={loginImg} alt="Login" width="400"/>
                    </div>
                    <Card>
                        <div className={styles.form}>
                            <h2>Đăng nhập</h2>
                            <Formik initialValues={{
                                email: "", password: ""
                            }} validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        loginUser(values);
                                    }}>
                                <Form>
                                    <FastField name="email" component={InputField} placeholder="Email"/>
                                    <FastField name="password" component={InputField} placeholder="Mật khẩu"
                                               type="password"/>

                                    <Button
                                        loading={loading}
                                        type="submit"
                                    >
                                        {loading ? "" : "Đăng nhập"}

                                    </Button>
                                    <div className={styles.links}>
                                        <Link to="/reset">Quên mật khẩu ?</Link>
                                    </div>
                                    <p>-- or --</p>
                                </Form>
                            </Formik>
                            <button
                                type="submit"
                                className="--btn --btn-block"


                            >
                                <i className="bx bxl-google"></i>
                                Đăng nhập với Google
                            </button>
                            <span className={styles.register}>
                <p>
                  Bạn chưa có tài khoản ? &nbsp;
                    <Link to="/register">
                    <b>Đăng ký</b>
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
