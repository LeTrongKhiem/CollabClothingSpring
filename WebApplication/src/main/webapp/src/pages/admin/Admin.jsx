import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Customers from "./Customers";
import Dashboard from "./Dashboard";
import Products from "./Products";
import styles from "./admin.module.scss";
const Admin = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className={styles.layout}>
            <Sidebar />
            <div className={styles.layout__content}>
              <div className={styles.layout__content__main}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/products" element={<Products />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Admin;
