import styles from "./auth.module.scss";
import {Link, useNavigate} from "react-router-dom";
// import resetImg from "../../assets/forgot.png";
import Card from "../../components/UI/Card";
import {useState} from "react";
import Helmet from "../../components/Helmet";
import {FastField, Form, Formik} from "formik";
import InputField from "../../custom-fields/InputField";
import * as Yup from "yup";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import axios from "axios";
import Button from "../../components/UI/Button";
import {useTranslation} from "react-i18next";

const Reset = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const resetPassword = async (value) => {
        try {
            const response = await UserService.resetPassword(value.email);
            if (response.status === 200) {
                toast.success("Đặt lại mật khẩu thành công vui lòng kiểm tra email");
                navigate("/login");
            }
        } catch (e) {
            toast.error("Đặt lại mật khẩu thất bại hoặc email không tồn tại");
        }

    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t("auth.validate.email"))
            .email(t("auth.validate.emailInvalid"))
            .test('check-email-exist', t("auth.validate.emailNotExist"), async function (value) {
                try {
                    const
                        response = await UserService.checkEmailExist(value);
                    if (response.data === null) {
                        return false;
                    } else if (!response.data.exists) {
                        return true;
                    } else {
                        // Proceed with password reset flow
                        console.log("Email exists in the system!");
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }),

    })

    return (
        <>
            <Helmet title="Reset Password"/>
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    {/*<img src={resetImg} alt="Reset Password" width="400" />*/}
                </div>

                <Card>
                    <div className={styles.form}>
                        <h2>{t("auth.reset.reset")}</h2>
                        <Formik initialValues={
                            {
                                email: ""
                            }
                        }
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    resetPassword(values)
                                }}>
                            {(props) => {
                                const {values, errors, touched} = props;
                                console.log(values.email);
                                return (
                                    <Form>
                                        <FastField name="email" component={InputField} placeholder="Email"/>

                                        <Button
                                            loading={loading}
                                            type="button"
                                            >
                                            {loading ? "" : t("auth.reset.reset")}
                                        </Button>
                                        <div className={styles.links}>
                                            <p>
                                                <Link to="/login">- {t("auth.reset.login")}</Link>
                                            </p>
                                            <p>
                                                <Link to="/register">- {t("auth.reset.register")}</Link>
                                            </p>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default Reset;
