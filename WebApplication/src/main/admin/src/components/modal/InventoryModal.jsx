import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import "./createUserModal.css";
import {toast} from "react-toastify";
import Select from "react-select";
import {colorOptions, fetchColors} from "../../constants/Colors";
import {sizeOptions} from "../../constants/Sizes";
import ProductsService from "../../services/ProductsService";

function InventoryModal({show, onHide, productId}) {

    const initialState = {
        colorId: null, sizeId: null, quantity: 0
    };
    const [inventory, setInventory] = useState(initialState);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [colorId, setColorId] = useState(null);
    const [sizeId, setSizeId] = useState(null);
    const [isQuantity, setIsQuantity] = useState(false);
    const isCallApi = () => {
        if (colorId === null || sizeId === null) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        const getQuantity = async () => {
            if (isCallApi()) {

                const res = await ProductsService.getQuantityByWarehouseId(productId, colorId, sizeId);
                if (res.status === 200) {
                    setInventory({...inventory, quantity: res.data})
                    setIsQuantity(true);
                }
            }
        }
        getQuantity();
    }, [colorId, sizeId, productId])

    const handleSubmit = (values, {resetForm}) => {
        try {
            ProductsService.addWarehouse(productId, values).then((res) => {
                if (res.status === 200) {

                    resetForm({
                        values: initialState,

                    });
                    setIsQuantity(false)
                    onHide();
                    toast.success("Thêm thành công", {
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
        colorId: Yup.string().required("Vui lòng chọn màu"),
        sizeId: Yup.string().required("Vui lòng chọn size"),
        quantity: Yup.number().required("Vui lòng nhập số lượng").min(1, "Số lượng phải lớn hơn 0")
    });
    useEffect(() => {
        colorOptions().then((res) => {
            setColor(res)
        })
        sizeOptions().then((res) => {
            setSize(res)
        })

    }, []);
    useEffect(() => {

    })
    return (


        <div className={`product-view__modal ${show ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={inventory}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        enableReinitialize={true}
                    >
                        {({
                              values, errors, touched, handleChange, handleBlur, setFieldValue
                          }) => {
                            console.log(values)
                            return (<Form>

                                <div className="form-group">

                                    <label htmlFor="colorId">Chọn màu: </label>
                                    <Select
                                        name="colorId"
                                        options={color}
                                        placeholder="Chọn màu"
                                        value={color.find((c) => c.value === values.colorId)}
                                        onChange={(selectedOption) => {
                                            values.colorId = selectedOption.value;
                                            setColorId(selectedOption.value)
                                        }}
                                    />
                                    {errors.colorId && touched.colorId ? (
                                        <div className="error">{errors.colorId}</div>) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sizeId">Chọn size: </label>
                                    <Select
                                        name="sizeId"
                                        options={size}
                                        placeholder="Chọn size"
                                        value={size.find((c) => c.value === values.sizeId)}
                                        onChange={(e) => {
                                            values.sizeId = e.value;
                                            setSizeId(e.value);
                                        }}
                                    />
                                    {errors.sizeId && touched.sizeId ? (
                                        <div className="error">{errors.sizeId}</div>) : null}
                                </div>

                                {isQuantity && <div className="form-group">
                                    <label htmlFor="quantity">Số lượng: </label>
                                    <FastField
                                        name="quantity"
                                        component={InputField}
                                        placeholder="Số lượng"
                                        value={values.quantity}
                                        type="number"

                                    />
                                </div>}

                                <button
                                    type="submit"
                                    className="btn-register"
                                >
                                    Thêm
                                </button>
                            </Form>);
                        }}
                    </Formik>


                    <div className="product-view__modal__content__close">
                        <button onClick={onHide}>
                            <i className="fas fa-times"></i>
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>)

}

export default InventoryModal;