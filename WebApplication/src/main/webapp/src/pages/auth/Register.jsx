import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import styles from "./auth.module.scss";
// import registerImg from "../../assets/images/register.png";
import Helmet from "../../components/Helmet";
import { toast } from "react-toastify";
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
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="user name"
                required
                name="userName"
                value={user.user_name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                placeholder="frist name"
                required
                name="fristName"
                value={user.frist_name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                placeholder="last name"
                required
                name="lastName"
                value={user.last_name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => {
                  handleDateChange(e);
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
                placeholder="Phone"
                required
                name="phoneNumber"
                value={user.phone}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={user.address}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="password"
                placeholder=" Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  handleConfirmPasswordChange(e);
                }}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <b>Login</b>
                </Link>
              </p>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          {/* <img src={registerImg} alt="Register" width="400" /> */}
        </div>
      </section>
    </Helmet>
  );
};

export default Register;
