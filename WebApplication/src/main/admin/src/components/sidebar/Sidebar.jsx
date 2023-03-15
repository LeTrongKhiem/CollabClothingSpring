import React from "react";

import { Link, useLocation } from "react-router-dom";

import "./sidebar.css";
import {useTranslation} from "react-i18next";
import i18n from '../../locales/i18n';

const sidebarItems = [
  {
    key: "dashboard",
    displayNameKey: "sidebar.dashboard",
    route: "/",
    icon: "bx bx-category-alt",
  },
  {
    displayNameKey: "sidebar.customers",
    route: "/customers",
    icon: "bx bx-user-pin",
  },
  {
    displayNameKey: "sidebar.products",
    route: "/products",
    icon: "bx bx-package",
  },
  {
    displayNameKey: "sidebar.orders",
    route: "/orders",
    icon: "bx bx-cart",
  },
  {
    displayNameKey: "sidebar.analytics",
    route: "/analytics",
    icon: "bx bx-bar-chart-alt",
  },
  {
    displayNameKey: "sidebar.categories",
    route: "/categories",
    icon: "bx bx-list-ol",
  },
  {
    displayNameKey: "sidebar.discount",
    route: "/discount",
    icon: "bx bx-gift",
  },
  {
    displayNameKey: "sidebar.inventory",
    route: "/inventory",
    icon: "bx bx-store-alt",
  },
  {
    displayNameKey: "sidebar.settings",
    route: "/settings",
    icon: "bx bx-cog",
  },
];


const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  const { t } = useTranslation();
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{t(props.displayNameKey)}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const location = useLocation();
  const { t } = useTranslation('sidebar');
  const activeItem = sidebarItems.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        {/* <img src={logo} alt="company logo" /> */}
      </div>
      {sidebarItems.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            icon={item.icon}
            active={index === activeItem}
            displayNameKey={item.displayNameKey}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
