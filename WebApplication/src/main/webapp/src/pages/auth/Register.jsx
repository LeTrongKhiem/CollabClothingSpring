import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/images/register.png";
import Helmet from "../../components/Helmet";
import { toast } from "react-toastify";
import Select from "react-select";
import UserService from "../../services/UserService";
import { FastField, Form, Formik } from "formik";
import InputField from "../../custom-fields/InputField";
import * as Yup from "yup";
import SelectField from "../../custom-fields/SelectField";
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
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Vui lòng nhập tên tài khoản"),
    firstName: Yup.string().required("Vui lòng nhập tên"),
    lastName: Yup.string().required("Vui lòng nhập họ"),
    // check day of birth
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

    phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập đúng định dạng email"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    gender: Yup.number().required("Vui lòng chọn giới tính").nullable(),
  });
  const [user, setUser] = useState({
    ...initialState,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  console.log(user);

  const navigate = useNavigate();
  const registerUser = (values) => {
    UserService.saveUser(values)
      .then((res) => {
        toast.success(
          "Đang ký thành công vui kiểm tra email để kích hoạt tài khoản"
        );
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Helmet title={"Đăng ký"}>
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
                const { values, errors, touched } = formikProps;
                console.log(values);
                return (
                  <Form>
                    <FastField
                      name="userName"
                      component={InputField}
                      placeholder="Tên tài khoản"

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
                      options={[
                        { value: "1", label: "Nam" },
                        { value: "2", label: "Nữ" },
                        { value: "3", label: "Khác" },
                      ]}
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
                      name="email"
                      component={InputField}
                      placeholder="Email"

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
                      type="submit"
                      className="--btn --btn-primary --btn-block"
                    >
                      Đăng ký
                    </button>
                  </Form>
                );
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
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </Helmet>
  );
};

export default Register;
