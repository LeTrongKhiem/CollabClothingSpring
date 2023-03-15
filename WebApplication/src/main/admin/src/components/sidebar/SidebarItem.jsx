import React from "react";
import {useTranslation} from "react-i18next";

const SidebarItem = (props) => {
    const { t } = useTranslation();
    const displayName = t(props.display_name_key);
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

export default SidebarItem;
