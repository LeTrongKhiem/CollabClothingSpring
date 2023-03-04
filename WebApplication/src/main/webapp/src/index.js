import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/index.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
//pages
import {
  Home,
  Register,
  VerifyEmail,
  Login,
  ResetPassword,
  Reset,
  UserProfile,
} from "./pages";
//components
import { Header } from "./components";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path={"/reset"} element={<Reset />} />
              <Route path={"/changePassword"} element={<ResetPassword />} />
              <Route path={"/user-profile"} element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
