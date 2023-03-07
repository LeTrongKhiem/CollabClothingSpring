import React from "react";

import { Link, useLocation } from "react-router-dom";

import "./sidebar.css";

const sidebar_items = [
  {
    display_name: "Dashboard",
    route: "/",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Customers",
    route: "/customers",
    icon: "bx bx-user-pin",
  },
  {
    display_name: "Products",
    route: "/products",
    icon: "bx bx-package",
  },
  {
    display_name: "Orders",
    route: "/orders",
    icon: "bx bx-cart",
  },
  {
    display_name: "Analytics",
    route: "/analytics",
    icon: "bx bx-bar-chart-alt",
  },
  {
    display_name: "categories",
    route: "/categories",
    icon: "bx bx-list-ol",
  },
  {
    display_name: "discount",
    route: "/discount",
    icon: "bx bx-gift",
  },
  {
    display_name: "inventory",
    route: "/inventory",
    icon: "bx bx-store-alt",
  },
  {
    display_name: "settings",
    route: "/settings",
    icon: "bx bx-cog",
  },
];

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const location = useLocation();
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
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
