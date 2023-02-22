import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import logo from "../assets/images/Logo-2.png";
// import { auth } from "../firebase/config";
// import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/auth/authSlice";
// import { ShowOnLogin, ShowOnLogout } from "./hiddenLink/hiddenLink";
// import productData from "../assets/fake-data/products";
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const [displayName, setdisplayName] = useState("");
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const cartItems = "";
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const totalProducts = cartItems.reduce(
  //     (total, item) => total + Number(item.quantity),
  //     0
  //   );
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      //   window.removeEventListener("scroll");
    };
  }, []);
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/firebase.User
  //         if (user.displayName === null) {
  //           const u1 = user.email.substring(0, user.email.lastIndexOf("@"));
  //           const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
  //           setdisplayName(uName);
  //         } else {
  //           setdisplayName(user.displayName);
  //         }
  //         dispatch(
  //           SET_ACTIVE_USER({
  //             email: user.email,
  //             userName: user.displayName ? user.displayName : user.email,
  //             userID: user.uid,
  //           })
  //         );
  //         // ...
  //       } else {
  //         // User is signed out
  //         // ...
  //         setdisplayName("");
  //         dispatch(REMOVE_ACTIVE_USER());
  //       }
  //     });
  //   }, [dispatch, displayName]);
  //   const logoutUser = () => {
  //     signOut(auth)
  //       .then(() => {
  //         toast.success("Logout Successful");
  //         navigate("/login");
  //       })
  //       .catch((error) => {
  //         toast.error(error.message);
  //       });
  //   };
  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
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
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <div className="header__cart">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag"></i>
                </Link>
                <span className="header__card-notice">{}</span>
                {/* <div className="header__cart-list">
                  <ul className="header__cart-list-item">
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="header__cart-item">
                      <img
                        src={product_02_image_01}
                        alt=""
                        className="header__cart-img"
                      />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Bàn phím Bluetooth Logitech K380
                          </h5>
                          <span className="header__cart-item-price">
                            595.000đ
                          </span>
                        </div>
                      </div>
                    </li>
                    {products.map((item, index) => (
                      <li className="header__cart-item" key={index}>
                        <img
                          src={item.product.image01}
                          alt=""
                          className="header__cart-img"
                        />
                        <div className="header__cart-item-info">
                          <div className="header__cart-item-head">
                            <h5 className="header__cart-item-name">
                              {item.product.title}
                            </h5>
                            <span className="header__cart-item-price">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>

            <div className="header__menu__item header__menu__right__item">
              {/* <ShowOnLogin> */}
              <Link>
                <i className="bx bx-user"></i>
                <span>{displayName}</span>
              </Link>
              {/* </ShowOnLogin> */}
            </div>
            <div className="header__menu__item header__menu__right__item">
              {/* <ShowOnLogout> */}
              <Link to="/login">Đăng nhập</Link>
              {/* </ShowOnLogout> */}
            </div>
            <div className="header__menu__item header__menu__right__item">
              {/* <ShowOnLogin> */}
              <Link to="/order-history">My Order</Link>
              {/* </ShowOnLogin> */}
            </div>
            <div className="header__menu__item header__menu__right__item">
              {/* <ShowOnLogin>
                <Link onClick={logoutUser} to="/login">
                  Logout
                </Link>
              </ShowOnLogin> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
