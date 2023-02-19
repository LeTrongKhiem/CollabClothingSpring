import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/index.scss";
//pages
import {Home, Register} from "./pages";
//components

import {ToastContainer} from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <div className="main">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
            <ToastContainer/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
