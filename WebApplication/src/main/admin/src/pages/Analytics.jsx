
import Chart from "react-apexcharts";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import "./Analytics.css";
import OrderService from "../services/OrderService";
import {useTranslation} from "react-i18next";

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}
const Analytics = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState([]);
    console.log(filterData)
    const [month, setMonth] = useState(0);
    console.log(month)
    const themeReducer = useSelector(state => state.theme)
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await OrderService.getAllOrders(0, 5, null, "shipName", "asc", 0, null)
            setOrders(response.data.results);
            setLoading(false);
        };
        getProducts();
    }, []);
    const orderByMonth = orders.map(order => {
        const parseDate = new Date(order.orderDate)
        return {
            month: parseDate.getDate() + '/' + (parseDate.getMonth() + 1),
            total: order.totalMoney
        }
    })
    const statsByMonth = orderByMonth.reduce((acc, cur) => {
        const found = acc.find(item => item.month === cur.month)
        if (found) {
            found.total += cur.total
        } else {
            acc.push(cur)
        }
        return acc
    }, [])

    const filterByMonth = (month) => {
        const filter = statsByMonth.filter(item => item.month.includes(`/${month}`))
        setFilterData(filter)
    }
    useEffect(() => {
            filterByMonth(month)
        }
        , [month])


    const chartOptionsBar = {
        series: [{
            name: 'Doanh thu theo tháng',
            data: filterData.map(item => item.total)
        }],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: filterData.map(item => item.month)
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false

            }
        }

    }
    const {t} = useTranslation();
    return (
        <div>
            <h2 className="page-header"> {t('analytic.title')}</h2>
            <select defaultValue="" className="" onChange={(e) => setMonth(e.target.value)}>
                <option value="">Chọn tháng</option>
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                <option value="4">Tháng 4</option>
                <option value="5">Tháng 5</option>
                <option value="6">Tháng 6</option>
                <option value="7">Tháng 7</option>
                <option value="8">Tháng 8</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>

            </select>
            <div className="row">


                <div className="col-12">

                    <div className="card">


                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptionsBar.options,
                                theme: {mode: 'dark'}
                            } : {
                                ...chartOptionsBar.options,
                                theme: {mode: 'light'}
                            }}
                            series={chartOptionsBar.series}
                            type='bar'
                            height='400px'
                            width='100%'
                        />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;