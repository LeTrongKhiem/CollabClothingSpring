import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import "./categoriesEdit.css";
import {toast} from "react-toastify";
import CategoriesService from "../../services/CategoriesService";
import Select from "react-select";
import OrderService from "../../services/OrderService";

function EditOrder({showModalEdit, closeModalEdit, setChanges, orderId}) {
    const initialState = {
            id: "",
            shipName: "",
            shipAddress: "",
            shipPhoneNumber: "",
            shipEmail: "",
        }
    ;
    const [modal, setModal] = useState(showModalEdit);
    const [orderEdit, setOrđerEdit] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (values) => {
        try {
            OrderService.updateOrder(orderId,values).then((res) => {
                if (res.status === 200) {
                    setChanges(true)
                    closeModalEdit();
                    toast.success("Sửa thành công", {
                        position: toast.POSITION.TOP_CENTER
                    });

                }
            }).catch((err) => {

                toast.error("Thêm thất bại", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
        } catch (e) {
            toast.error(e.errors)
        }

    };
    const validationSchema = Yup.object().shape({
        shipName: Yup.string().required("Vui lòng nhập tên"),
        shipAddress: Yup.string().required("Vui lòng nhập địa chỉ"),
        shipPhoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
        shipEmail: Yup.string().required("Vui lòng nhập email"),


    });

    useEffect(() => {
        if (orderId === null) {
            setLoading(false)
            return;
        }

        async function fetchOrderById() {
            const response = await OrderService.getOrderById(orderId);
            setOrđerEdit(response.data)
            setLoading(false)
        }

        fetchOrderById().then(r => {
            setLoading(false)
        });
    }, [orderId])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div className={`product-view__modal ${showModalEdit ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={orderEdit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        validateOnChange={true}
                        onSubmit={handleSubmit}
                    >
                        {({
                              values,
                              handleBlur,
                              setFieldValue,
                              setFieldTouched,
                              setFieldError
                          }) => {

                            return (<Form>
                                <label htmlFor="shipName">Tên nguười nhận: </label>
                                <FastField
                                    name="shipName"
                                    component={InputField}
                                    placeholder="Tên danh mục"
                                    value={values.shipName}
                                    htmlFor="name"

                                />

                                <label htmlFor="shipAddress">Địa chỉ: </label>
                                <FastField
                                    name="shipAddress"
                                    component={InputField}
                                    placeholder="shipAddress"
                                    value={values.shipAddress}
                                    htmlFor="sortOrder"

                                />
                                <label htmlFor="shipPhoneNumber">Số điện thoại: </label>
                                <FastField
                                    name="shipPhoneNumber"
                                    component={InputField}
                                    placeholder="shipPhoneNumber"
                                    value={values.shipPhoneNumber}
                                    htmlFor="level"
                                />
                                <label htmlFor="shipEmail">Email : </label>
                                <FastField
                                    name="shipEmail"
                                    component={InputField}
                                    placeholder="shipEmail"
                                    value={values.shipEmail}
                                    htmlFor="shipEmail"
                                />


                                <button
                                    type="submit"
                                    className="btn-register"
                                >
                                    Xác nhận
                                </button>
                            </Form>);
                        }}
                    </Formik>


                    <div className="product-view__modal__content__close">
                        <button onClick={closeModalEdit}>
                            <i className="fas fa-times"></i>
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>)

}

export default EditOrder;