import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import "./App.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import './assets/css/theme.css'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/sidebar/Sidebar";
import {Dashboard, Customers, Products, Categories, Brands, Inventory, Orders, Analytics} from "./pages";
import Login from "./pages/Login";
import {logout, selectIsLoggedIn} from "./redux/slice/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import Topnav from "./components/topnav/TopNav";
import AddProduct from "./pages/AddProduct";
import ProductImages from "./pages/ProductImages";
import EditProduct from "./pages/EditProduct";
import {useEffect, useState} from "react";
import ThemeAction from "./redux/actions/ThemeAction";
import axios from "axios";
import jwt_decode from "jwt-decode";
function App() {
    const themeReducer = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // console.log(isLoggedIn)
    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwt_decode(token);
            const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
            const timeUntilExpiration = expirationTime - Date.now();

            const timeoutId = setTimeout(() => {
                dispatch(logout());
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                window.location.href = "/login";
            }, timeUntilExpiration);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [dispatch]);
    return (<BrowserRouter>
        <Routes>
            {isLoggedIn || localStorage.getItem("isLoginAdmin") ? (<Route
                path="/*"
                element={<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar/>
                    <div className="layout__content">
                        <Topnav/>
                        <div className="layout__content-main">
                            <Routes>
                                <Route path="" element={<Dashboard/>}/>
                                <Route path="/customers" element={<Customers/>}/>
                                <Route path="/products/*" element={<Products/>}/>
                                <Route path="products/addProduct" element={<AddProduct/>}/>
                                <Route path="products/images/:id" element={<ProductImages/>}/>
                                <Route path="products/:id" element={<EditProduct/>}/>
                                <Route path="categories" element={<Categories/>}/>
                                <Route path="brands" element={<Brands/>}/>
                                <Route path="/inventory" element={<Inventory/>}/>
                                <Route path="/orders" element={<Orders/>}/>
                                <Route path="/analytics" element={<Analytics/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>}
            />) : (<Route path="/login" element={<Login/>}/>)}
            <Route path="/*" element={isLoggedIn || localStorage.getItem("isLoginAdmin") ? <Navigate to="/"/> :
                <Navigate to="/login"/>}/>
        </Routes>
        <ToastContainer/>
    </BrowserRouter>);
}

export default App;
