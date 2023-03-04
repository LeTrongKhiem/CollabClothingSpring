import React, {useEffect, useState} from "react";
import styles from "./userProfile.module.scss";
import axios from "axios";
import {Form, Formik} from "formik";
import Select from "react-select";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import * as Yup from "yup";

const UserProfile = () => {

    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const genderOptions = [{label: 'Nam', value: '1'}, {label: 'Nữ', value: '2'}, {label: 'Khác', value: '3'}];
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            UserService.getCurrentUser() // gọi API để lấy thông tin user
                .then(response => {
                    setUser(response.data)
                    setLoading(false)
                })
                .catch(error => console.log(error));
        }
    }, []);
    const saveProfile = (values) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        UserService.updateUser({
            "userName": "",
            "firstName": values.firstName,
            "lastName": values.lastName,
            "phoneNumber": values.phoneNumber,
            "address": values.address,
            "dob": values.dob,
            "gender": values.gender
        }).then((res) => {
            if (res.status === 200) {
                console.log(res)
                toast.success("Cập nhật thành công");
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Cập nhật thất bại");
        });
    }
    const changePassword = (values) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        UserService.updatePassword({
            "oldPassword": values.oldPassword, "newPassword": values.newPassword,
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                console.log(res)
                toast.success("Cập nhật thành công");
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Cập nhật thất bại hoặc mật khẩu cũ không đúng");
        });
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Vui lòng nhập tên'),
        lastName: Yup.string()
            .required('Vui lòng nhập họ'),
        phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại").matches(/^(?:\+84|0)[3-9]\d{8}$/, "Số điện thoại không hợp lệ"),
        address: Yup.string()
            .required('Vui lòng nhập địa chỉ'),
        dob: Yup.date()
            .nullable()
            .test("dob", "Khách hàng phải trên 14 tuổi", function (value, ctx) {
                const dob = new Date(value);
                const validDate = new Date();
                const valid = validDate.getFullYear() - dob.getFullYear() >= 13;
                return !valid ? ctx.createError() : valid;
            })
            .test("dob", "Năm sinh phải lớn hơn 1930 ", function (value, ctx) {
                const dob = new Date(value);
                const valid = dob.getFullYear() >= 1930;
                return !valid ? ctx.createError() : valid;
            })
            .required("Vui lòng nhập ngày sinh"),


    })
    const validationSchemaPassword = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Vui lòng nhập mật khẩu cũ').matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"),
        newPassword: Yup.string()
            .required('Vui lòng nhập mật khẩu mới').matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"),
        confirmPassword: Yup.string()
            .required("Vui lòng nhập lại mật khẩu mới")
            .oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp"),
    })

    if (loading) return <div>Loading...</div>
    return (<div className={styles.userProfile}>
        <div className={styles.profileHeader}>
            <div className={styles.profileHeader__avatar}>
                {/* <img src={} alt="Avatar" /> */}
            </div>
            <div className={styles.profileHeader__title}>
                <h2>{user.lastName + " " + user.firstName}</h2>

            </div>
        </div>
        <div className={styles.profileTabs}>
            <div
                className={`${styles.tab} ${activeTab === "profile" && styles.active}`}
                onClick={() => setActiveTab("profile")}
            >
                Thông tin
            </div>
            <div
                className={`${styles.tab} ${activeTab === "password" && styles.active}`}
                onClick={() => setActiveTab("password")}
            >
                Bảo mật
            </div>
        </div>
        <div className={styles.profileContent}>
            {activeTab === "profile" && (<>
                <div className={styles.section}>
                    <h3>Thông tin cơ bản</h3>
                    <Formik
                        initialValues={user}
                        onSubmit={saveProfile}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validationSchema={validationSchema}
                    >
                        {({values, errors, setFieldValue}) => {
                            return (<Form>
                                    <div className={styles.formGroup}>
                                        <label>Họ</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={(e) => setFieldValue('lastName', e.target.value)}
                                        />
                                        {errors.lastName ? (
                                            <div className={styles.errorMessage}>{errors.lastName}</div>) : null}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Tên</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={(e) => setFieldValue('firstName', e.target.value)}
                                        />
                                        {errors.firstName ? (
                                            <div className={styles.errorMessage}>{errors.firstName}</div>) : null}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Email</label>
                                        <input type="email" name="email" defaultValue={values.email} readOnly/>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Giới tính</label>
                                        <Select
                                            options={genderOptions}
                                            name="gender"
                                            value={genderOptions.find((g) => Number(g.value) === values.gender)}
                                            onChange={(selectedOption) => setFieldValue('gender', selectedOption.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Ngày Sinh</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={!isNaN(new Date(values.dob)) ? new Date(values.dob || '').toISOString().slice(0, 10) : ''}
                                            onChange={(e) => setFieldValue('dob', e.target.value)}
                                        />
                                        {errors.dob && (<div className={styles.errorMessage}>{errors.dob}</div>)}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Điện thoại</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                                        />
                                        {errors.phoneNumber ? (
                                            <div className={styles.errorMessage}>{errors.phoneNumber}</div>) : null}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            onChange={(e) => setFieldValue('address', e.target.value)}
                                        />
                                        {errors.address ? (
                                            <div className={styles.errorMessage}>{errors.address}</div>) : null}
                                    </div>

                                    <div className={styles.formGroupButton}>
                                        <button type="submit">Lưu thay đổi</button>
                                    </div>
                                </Form>);
                        }}
                    </Formik>
                </div>

            </>)}
            {activeTab === "password" && (<div className={styles.section}>
                <div className={styles.section}>
                    <h3>Đổi mật khẩu</h3>
                    <Formik
                        initialValues={{
                            oldPassword: '', newPassword: '', confirmPassword: '',
                        }}

                        onSubmit={(values, {resetForm}) => {
                            changePassword(values)
                            resetForm(); // đặt lại giá trị của form
                        }}
                        validationSchema={validationSchemaPassword}
                    >
                        {({values, setFieldValue, errors, touched, handleBlur}) => (<Form>
                                <div className={styles.formGroup}>
                                    <label>Mật khẩu hiện tại</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={values.oldPassword}
                                        onChange={(e) => {
                                            setFieldValue('oldPassword', e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.oldPassword && touched.oldPassword ? styles.error : ''}
                                    />
                                    {errors.oldPassword && touched.oldPassword ? (
                                        <div className={styles.errorMessage}>{errors.oldPassword}</div>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mật khẩu mới</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={(e) => {
                                            setFieldValue('newPassword', e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.newPassword && touched.newPassword ? styles.error : ''}
                                    />
                                    {errors.newPassword && touched.newPassword ? (
                                        <div className={styles.errorMessage}>{errors.newPassword}</div>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Nhập lại mật khẩu mới</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={(e) => {
                                            setFieldValue('confirmPassword', e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.confirmPassword && touched.confirmPassword ? styles.error : ''}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <div className={styles.errorMessage}>{errors.confirmPassword}</div>) : null}
                                </div>
                                <div className={styles.formGroupButton}>
                                    <button type="submit">Đổi mật khẩu</button>
                                </div>
                            </Form>)}
                    </Formik>


                </div>
            </div>)}
        </div>
    </div>)
};

export default UserProfile;
