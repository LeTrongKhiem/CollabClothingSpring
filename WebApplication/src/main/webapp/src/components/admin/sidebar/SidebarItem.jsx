import React from "react";
import styles from "./sidebar.module.scss";
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

export default SidebarItem;
