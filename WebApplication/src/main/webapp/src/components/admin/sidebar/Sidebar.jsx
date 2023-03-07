import React from "react";

import { Link, useLocation } from "react-router-dom";

import styles from "./sidebar.module.scss";
const sidebar_items = [
  {
    display_name: "Dashboard",
    route: "/admin",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Customers",
    route: "/admin/customers",
    icon: "bx bx-user-pin",
  },
  {
    display_name: "Products",
    route: "/admin/products",
    icon: "bx bx-package",
  },
  {
    display_name: "Orders",
    route: "/admin/orders",
    icon: "bx bx-cart",
  },
  {
    display_name: "Analytics",
    route: "/admin/analytics",
    icon: "bx bx-bar-chart-alt",
  },
  {
    display_name: "categories",
    route: "/admin/categories",
    icon: "bx bx-list-ol",
  },
  {
    display_name: "discount",
    route: "/admin/discount",
    icon: "bx bx-gift",
  },
  {
    display_name: "inventory",
    route: "/admin/inventory",
    icon: "bx bx-store-alt",
  },
  {
    display_name: "settings",
    route: "/admin/settings",
    icon: "bx bx-cog",
  },
];

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className={styles.sidebar__item}>
      <div className={`${styles.sidebar__item_inner} ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        {/* <img src={logo} alt="company logo" /> */}
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
