import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Card from "../../components/UI/Card";
import {
    clearCart, selectCartItems,
} from "../../redux/slice/cartItemsSlice";
import CheckoutSummary from "../../components/CheckoutSummary";
import axios from "axios";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InputField";
import CartService from "../../services/CartService";

const CheckoutDetails = () => {
    const initialValues = {
        shipName: "", shipPhoneNumber: "", shipEmail: "", address: "", province: "", district: "", ward: "",

    }
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [reset, setReset] = useState(false)
    const validationSchema = Yup.object().shape({
        shipName: Yup.string().required("Vui lòng nhập họ tên"),
        shipPhoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
        shipEmail: Yup.string().required("Vui lòng nhập email"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        province: Yup.string().required('Vui lòng chọn Tỉnh/Thành Phố'),
        district: Yup.string().required('Vui lòng chọn Quận/Huyện'),
        ward: Yup.string().required('Vui lòng chọn Phường/Xã'),
    });


    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await axios.get('https://vapi.vnappmob.com/api/province/')
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict(null)
        const fetchPublicDistrict = async () => {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province}`)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])
    const [wards, setWards] = useState([])
    useEffect(() => {
        setWard(null)
        const fetchPublicWard = async () => {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district}`)
            if (response.status === 200) {
                setWards(response.data?.results)
            }
        }
        district && fetchPublicWard()
        !district && setWards([])
    }, [district])

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        setTotalAmount(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);


    const handleSubmit = (values) => {
        // find province
        const provinceName = provinces.find(province => province.province_id === values.province).province_name
        const districtName = districts.find(district => district.district_id === values.district).district_name
        const wardName = wards.find(ward => ward.ward_id === values.ward).ward_name
        const shipAddress = `${values.address}, ${wardName}, ${districtName}, ${provinceName}`
        const orderConfig = {
            shipName: values.shipName, shipPhoneNumber: values.shipPhoneNumber, shipAddress: shipAddress,
            shipEmail: values.shipEmail, totalMoney: totalAmount, orderDetails: [
                ...cartItems.map(item => {
                    return {
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        colorId: item.color.id,
                        sizeId: item.size.id
                    }
                })
            ]
        };
        console.log(orderConfig)
        try {
            CartService.createOrder(orderConfig)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Đặt hàng thành công");
                        dispatch(clearCart());
                        navigate("/order");
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });

        } catch (error) {
            toast.error(error.message);
        }
    };
    return (<section>
        <div className="checkout">
            <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validationSchema}>
                {({handleChange, values, errors, touched, handleBlur}) => {
                    return (<Form>
                        <div>
                            <Card cardClass="card">
                                <label>Họ và Tên</label>
                                <FastField
                                    type="text"
                                    component={InputField}
                                    placeholder="Họ và Tên"
                                    required
                                    name="shipName"
                                    value={values.shipName}
                                    onChange={handleChange}
                                />

                                <label>Email</label>
                                <FastField
                                    component={InputField}
                                    type="text"
                                    placeholder="Email"
                                    required
                                    name="shipEmail"
                                    value={values.shipEmail}
                                    onChange={handleChange}
                                />
                                <label>Số Điện Thoại</label>
                                <FastField
                                    component={InputField}
                                    type="text"
                                    placeholder="Số Điện Thoại"
                                    required
                                    name="shipPhoneNumber"
                                    value={values.shipPhoneNumber}
                                    onChange={handleChange}
                                />
                                <label>Địa Chỉ</label>
                                <div className="address">
                                    <select
                                        name="province"
                                        id="province"
                                        onBlur={handleBlur}
                                        value={values.province}
                                        onChange={(e) => {
                                            setProvince(e.target.value)
                                            handleChange(e)
                                        }}
                                    >
                                        <option value="">Chọn Tỉnh/Thành Phố</option>
                                        {provinces.map((province) => (
                                            <option key={province.province_id} value={province.province_id}>
                                                {province.province_name}
                                            </option>))}
                                    </select>

                                    <select
                                        name="district"
                                        id="district"
                                        value={values.district}
                                        onChange={(e) => {
                                            setDistrict(e.target.value)
                                            handleChange(e)
                                        }}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.district_id} value={district.district_id}>
                                                {district.district_name}
                                            </option>))}
                                    </select>
                                    <select
                                        name="ward"
                                        id="ward"
                                        onChange={(e) => {
                                            console.log(e.target.name)
                                            setWard(e.target.value)
                                            handleChange(e)
                                        }}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map((ward) => (<option key={ward.ward_id} value={ward.ward_id}>
                                            {ward.ward_name}
                                        </option>))}
                                    </select>


                                </div>
                                {touched.province && errors.province ? (
                                    <div className="error">{errors.province}</div>) : null}
                                {touched.district && errors.district ? (
                                    <div className="error">{errors.district}</div>) : null}
                                {touched.ward && errors.ward ? (<div className="error">{errors.ward}</div>) : null}
                                <FastField
                                    component={InputField}
                                    required
                                    type="text"
                                    placeholder="Số nhà, tên đường"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                />
                                <button type="submit" className="--btn --btn-primary">
                                    Đặt hàng
                                </button>
                            </Card>
                        </div>
                        <div>
                            <Card cardClass="card">
                                <CheckoutSummary/>
                            </Card>
                        </div>
                    </Form>)
                }}


            </Formik>
        </div>
    </section>);
};

export default CheckoutDetails;
