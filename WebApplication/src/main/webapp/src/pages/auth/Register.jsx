import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/images/register.png";
import Helmet from "../../components/Helmet";
import { toast } from "react-toastify";
import Select from "react-select";
import UserService from "../../services/UserService";
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
    gender: "",
  };
  const [user, setUser] = useState({
    ...initialState,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  console.log(dob);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setDob(date);
    setUser({
      ...user,
      dob: date,
    });
  };
  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
  };
  console.log(user);

  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    UserService.saveUser(user)
        .then((res) => {
          toast.success("Registration Successful...");
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
              <form onSubmit={registerUser}>
                <input
                    type="text"
                    placeholder="Tên tài khoản"
                    required
                    name="userName"
                    value={user.user_name}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    style={{ marginBottom: "0px" }}
                />
                <div className={styles.group}>
                  <input
                      type="text"
                      placeholder="Họ"
                      required
                      name="firstName"
                      value={user.frist_name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                  />
                  <input
                      type="text"
                      placeholder="Tên"
                      required
                      name="lastName"
                      value={user.last_name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                  />
                </div>

                <input
                    type="text"
                    name="dob"
                    value={dob}
                    style={{ marginTop: "0px", color: "#777" }}
                    onChange={(e) => {
                      handleDateChange(e);
                    }}
                    placeholder="Ngày sinh"
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                />
                <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "" : "#777",
                        color: "#777",
                        fontSize: "16px",
                      }),
                    }}
                    options={[
                      { value: "0", label: "Nam" },
                      { value: "1", label: "Nữ" },
                    ]}
                    placeholder="Giới tính"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        gender: e.value,
                      });
                    }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                />
                <input
                    type="text"
                    placeholder="Điện thoại"
                    required
                    name="phoneNumber"
                    value={user.phone}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                />
                <input
                    type="text"
                    placeholder="Địa chỉ"
                    required
                    name="address"
                    value={user.address}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                />
                <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      handleConfirmPasswordChange(e);
                    }}
                />

                <button type="submit" className="--btn --btn-primary --btn-block">
                  Đăng ký
                </button>
              </form>

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