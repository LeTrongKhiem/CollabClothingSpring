import React, {useEffect, useState} from "react";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../../custom-fields/InputField";
import "../categoriesEdit.css";
import {toast} from "react-toastify";
import BrandsService from "../../../services/BrandsService";
import Select from "react-select";

function EditCategories({showModalEdit, closeModalEdit, setChanges, brandId}) {
    const initialState = {
            id: "",
            name: "",
            description: "",
            pathLogo: "",

        }
    ;
    const [modal, setModal] = useState(showModalEdit);
    const [brandEdit, setBrandEdit] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (values) => {
        try {
            BrandsService.updateBrand(brandId,values).then((res) => {
                if (res.status === 200) {
                    setChanges(true)
                    closeModalEdit();
                    toast.success("Sửa thành công", {
                        position: toast.POSITION.TOP_CENTER
                    });

                }
            }).catch((err) => {

                toast.error("Sửa thất bại", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
        } catch (e) {
            toast.error(e.errors)
        }

    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên"),


    });

    useEffect(() => {
        if (brandId === null) {
            setLoading(false)
            return;
        }
        async function fetchCategory() {
            const response = await BrandsService.getBrandById(brandId);
            setBrandEdit(response.data)
            setLoading(false)
        }

        fetchCategory().then(r => {
            setLoading(false)
        });
    }, [brandId])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div className={`product-view__modal ${showModalEdit ? "active" : ""}`}>

            <div className="product-view__modal__content auth">
                <div className="form">
                    <Formik
                        initialValues={brandEdit}
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

                            console.log(values)
                            return (<Form>
                                <label htmlFor="name">Tên thương hiệu: </label>
                                <FastField
                                    name="name"
                                    component={InputField}
                                    placeholder="Tên thương hiệu"
                                    value={values.name}
                                    htmlFor="name"

                                />

                                <label htmlFor="description">Mô tả: </label>
                                <FastField
                                    name="description"
                                    component={InputField}
                                    placeholder="description"
                                    value={values.sortOrder}
                                    htmlFor="description"

                                />
                                <label htmlFor="pathLogo">Đường dẫn Logo: </label>
                                <FastField
                                    name="pathLogo"
                                    component={InputField}
                                    placeholder="pathLogo"
                                    value={values.level}
                                    htmlFor="pathLogo"
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

export default EditCategories;