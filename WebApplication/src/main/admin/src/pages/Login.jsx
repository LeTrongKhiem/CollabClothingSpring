import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../redux/slice/authSlice";
import "./Login.css";
import {Form, Formik} from "formik";
import UserService from "../services/UserService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup" ;

function Login() {
    const [toggleEye, setToggleEye] = useState(false);
    const [inputType, setInputType] = useState("password");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleToggle = (e) => {
        setToggleEye(!toggleEye);
        setInputType(inputType === "password" ? "text" : "password");
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ").matches(/@[^.]*\./),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"),
    });
    const loginUser = (value) => {


        // Gửi yêu cầu đăng nhập mới
        UserService.login(value)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    UserService.getCurrentUser().then((res) => {
                        console.log(res.data)
                        if (res.data.role === "ADMIN") {
                            toast.success("Đăng nhập thành công");
                            dispatch(login(value));
                            localStorage.setItem("isLogin", "true")
                            navigate("/");

                        } else {
                            toast.error("Bạn không có quyền truy cập");
                        }
                    })


                }
            })
            .catch((err) => {
                toast.error("Đăng nhập thất bại");
            });
    };


    return (<section className="container forms">
        <div className="form login">
            <div className="form-content">
                <header>Login</header>
                <Formik initialValues={{
                    email: "", password: ""
                }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            loginUser(values);
                        }}
                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {

                        return (<Form action="#">
                                <div className="field input-field">
                                    <input type="email" placeholder="Email" className="input"
                                           name="email"
                                           onChange={handleChange}
                                           value={values.email}
                                           onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="errorMessage">{errors.email}</div>) : null}
                                </div>

                                <div className="field input-field">
                                    <input type={inputType} name="password" placeholder="Password" className="password"
                                           onChange={handleChange}
                                           value={values.password}
                                           onBlur={handleBlur}

                                    />
                                    {
                                        toggleEye ? <i className="bx bx-show eye-icon" onClick={handleToggle}></i> :
                                            <i className="bx bx-hide eye-icon" onClick={handleToggle}></i>
                                    }

                                    {errors.password && touched.password ? (
                                        <div className="errorMessage">{errors.password}</div>) : null}

                                </div>

                                <div className="form-link"></div>

                                <div className="field button-field">
                                    <button>Login</button>
                                </div>
                            </Form>)
                    }

                    }

                </Formik>
            </div>


        </div>
    </section>);
}

export default Login;
