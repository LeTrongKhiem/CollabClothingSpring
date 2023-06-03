import React, {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import UserService from "../../services/UserService";
import axios from "axios";
import i18n from "../../locales/i18n";
import {loginSuccess, logoutSuccess} from "../../redux/slice/authSlice";
// import logo from "../assets/images/Logo-2.png";
// import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/auth/authSlice";
import {ShowOnLogin, ShowOnLogout} from "../hiddenLink/hiddenLink";
import jwt_decode from "jwt-decode";
import {selectCartItems} from "../../redux/slice/cartItemsSlice";
import {useTranslation} from "react-i18next";
import vietnamFlag from "../../assets/images/vietnam-flag-icon.svg";
import englishFlag from "../../assets/images/united-kingdom-flag-icon.svg";

const mainNav = [{
    display: "nav.home", path: "/",
}, {
    display: "nav.products", path: "/products",
}, {
    display: "nav.accessories", path: "/accessories",
}, {
    display: "nav.contact", path: "/contact",
},];

const Header = () => {
    const {pathname} = useLocation();
    const [displayName, setdisplayName] = useState("");
    const [language, setLanguage] = useState("vi");
    const [showSearchInput, setShowSearchInput] = useState(false);
    const activeNav = mainNav.findIndex((e) => e.path === pathname);
    const cartItems = useSelector(selectCartItems);
    const headerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const handleSearchIconClick = () => {
        setShowSearchInput(true);
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            UserService.getCurrentUser().then((res) => {
                if (res.status === 200) {
                    dispatch(loginSuccess(res.data));
                    const name = res.data.lastName + " " + res.data.firstName;
                    setdisplayName(name);
                }
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token"); // Xóa token trong localStorage
                    delete axios.defaults.headers.common["Authorization"]; // Xóa token trong header của axios
                    logoutUser(); // Gọi hàm logoutUser để đăng xuất và hiển thị thông báo
                }
            });
        }
    }, [dispatch]);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwt_decode(token);
            const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
            const timeUntilExpiration = expirationTime - Date.now();

            const timeoutId = setTimeout(() => {
                dispatch(logoutSuccess());
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                navigate("/login")
            }, timeUntilExpiration);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [dispatch]);
    const logoutUser = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        dispatch(logoutSuccess());
        toast.success("Đăng xuất thành công");
        navigate("/login");
    };


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        });
        return () => {
            window.removeEventListener("scroll", null);
        };
    }, []);

    const menuLeft = useRef(null);
    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
    }

    const menuToggle = () => menuLeft.current.classList.toggle("active");

    return (<div className="header" ref={headerRef}>
        <div className="container">
            <div className="header__logo">
                <Link to="/">{/* <img src={logo} alt="" /> */}</Link>
            </div>
            <div className="header__menu">
                <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                    <i className="bx bx-menu-alt-left"></i>
                </div>
                <div className="header__menu__left" ref={menuLeft}>
                    <div className="header__menu__left__close" onClick={menuToggle}>
                        <i className="bx bx-chevron-left"></i>
                    </div>
                    {mainNav.map((item, index) => (<div
                            key={index}
                            className={`header__menu__item header__menu__left__item ${index === activeNav ? "active" : ""}`}
                            onClick={menuToggle}
                        >
                            <Link to={item.path}>
                                <span>    {t(item.display)}</span>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="header__menu__right">
                    {/*<div className="header__menu__item header__menu__right__item">*/}
                    {/*    {showSearchInput === false ?*/}

                    {/*        <i className="bx bx-search" onClick={handleSearchIconClick}></i> : null}*/}
                    {/*    {showSearchInput && (<div className="header__search">*/}
                    {/*        <input type="text" placeholder="Tìm kiếm sản phẩm"*/}
                    {/*               onBlur={() => setShowSearchInput(false)}/>*/}
                    {/*    </div>)}*/}
                    {/*    <style jsx>{`*/}
                    {/*      .header__search {*/}
                    {/*        font-size: 12px;*/}
                    {/*        animation: slideIn 0.3s ease-in-out forwards;*/}
                    {/*      }*/}

                    {/*      .header__search input {*/}
                    {/*        font-size: 12px;*/}
                    {/*        width: 100%;*/}
                    {/*        border: 1px solid #ebebeb;*/}
                    {/*        border-radius: 5px;*/}
                    {/*        outline: none;*/}
                    {/*        padding: 6px;*/}
                    {/*      }*/}

                    {/*      @keyframes slideIn {*/}
                    {/*        from {*/}
                    {/*          transform: translateX(-100%);*/}
                    {/*        }*/}
                    {/*        to {*/}
                    {/*          transform: translateX(0);*/}
                    {/*        }*/}
                    {/*      }*/}
                    {/*    `}*/}
                    {/*    </style>*/}
                    {/*</div>*/}
                    <div className="header__menu__item header__menu__right__item">
                        <div className="header__cart">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                            <span className="header__card-notice">{cartItems.length}</span>

                        </div>
                    </div>

                    <div className="header__menu__item header__menu__right__item ">
                        <div className="header__user">
                            <ShowOnLogin>
                                <Link to="/user-profile">
                                    <i className='bx bx-user'></i>
                                    <span>{displayName}</span>
                                </Link>
                            </ShowOnLogin>
                        </div>
                    </div>
                    <div className="header__menu__item header__menu__right__item">
                        <ShowOnLogout>
                            <Link to="/login">
                                <span>
                                    {t("nav.login")}
                                </span>
                            </Link>
                        </ShowOnLogout>
                    </div>
                    <div className="header__menu__item header__menu__right__item">
                        <ShowOnLogin>
                            <Link to="/order-history"><span>{t("nav.orders")}</span></Link>
                        </ShowOnLogin>
                    </div>
                    <div className="header__menu__item header__menu__right__item">
                        <ShowOnLogin>
                            <Link onClick={logoutUser} to="/login">
                                    <span>

                                          {t("nav.logout")}

                                    </span>

                            </Link>
                        </ShowOnLogin>
                    </div>
                    <div className="header__menu__item header__menu__right__item">
                        {/*    multi languges*/}
                        <div>

                            {
                                language !== 'vi' ?
                                    <span onClick={() => switchLanguage('vi')}>     <img src={vietnamFlag}
                                                                                         width={'30px'}/></span> :
                                    <span onClick={() => switchLanguage('en')}>    <img src={englishFlag}
                                                                                        width={'30px'}/></span>
                            }


                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>)
        ;
};

export default Header;
