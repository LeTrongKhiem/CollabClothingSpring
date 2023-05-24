import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import "./categoriesEdit.css";
import {toast} from "react-toastify";
import OrderService from "../../services/OrderService";
import SelectField from "../../custom-fields/SelectField";

function ChangeOrderStatus({showStatusModal, closeStatusModal, setChanges, orderId}) {
    const initialState = {
        status: 0,
    };
    const [categoryEdit, setCategoryEdit] = useState(initialState);
    console.log(categoryEdit)
    const [loading, setLoading] = useState(true);
    const handleSubmit = (values) => {
        const status = JSON.stringify(values.status);
        console.log(status)

        try {
            OrderService.changeStatus(orderId, status).then((res) => {
                if (res.status === 200) {
                    setChanges(true)
                    closeStatusModal();
                    toast.success("Thay đổi trạng thaí thành công", {
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
        status: Yup.number().required("Vui lòng chọn trạng thái"),

    });

    useEffect(() => {
        if (orderId === null) {
            setLoading(false)
            return;
        }

        async function fetchOrderById() {
            const response = await OrderService.getOrderById(orderId);
            setCategoryEdit(response.data)
            setLoading(false)
        }

        fetchOrderById().then(r => {
            setLoading(false)
        });
    }, [orderId])
    const statusOptions = [{value: 1, label: "Đang xử lý"}, {value: 2, label: "Đang giao hàng"}, {
        value: 3, label: "Đã giao hàng"
    }, {value: 4, label: "Đã hủy"},]


    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div className={`product-view__modal ${showStatusModal ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={{
                            status: categoryEdit.status,
                        }}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        validateOnChange={true}
                        onSubmit={handleSubmit}
                    >
                        {({
                              values, setFieldValue
                          }) => {
                            return (<Form>

                                <label htmlFor="status">Trạng thái: </label>
                                <FastField
                                    component={SelectField}
                                    values={statusOptions.find(option => option.value === values)}
                                    name="status"
                                    id="status"
                                    placeholder="Trạng thái"
                                    options={statusOptions}
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
                        <button onClick={closeStatusModal}>
                            <i className="fas fa-times"></i>
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>)

}

export default ChangeOrderStatus;