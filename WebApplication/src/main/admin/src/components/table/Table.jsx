import React, {useEffect, useState} from 'react'

import './table.css'
import {useTranslation} from "react-i18next";
import i18n from '../../locales/i18n';
const Table = props => {

    const {totalPages, onChangePage, data, pageSize, currentPage, sortColumn,sortOrder,onSort} = props;
    console.log("totalPages",totalPages)

    const [dataShow, setDataShow] = useState([])
    const [range, setRange] = useState([...Array(totalPages).keys()]);
    useEffect(() => {
        setDataShow(data)
    }, [currentPage, data, pageSize, totalPages]);

    useEffect(() => {
        const newRange = [...Array(totalPages).keys()];
        setRange(newRange);
    }, [totalPages]);
    const handleClick = (page) => {
        onChangePage(page-1);
    };
    const  handleSort = (column) => {
        onSort(column)
    }
    const {t} = useTranslation();
    return (

        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData  ? (
                            <thead>
                            <tr>
                                {
                                    props.headData.map((item, index) => (
                                        <th
                                            key={index}
                                            onClick={() => handleSort(item.key)}
                                        >
                                            {t(item.label)}
                                            {
                                                sortColumn === item.key ? (
                                                    sortOrder === 'asc' ? (
                                                        <i className='bx bx-up-arrow-alt'></i>
                                                    ) : (
                                                        <i className='bx bx-down-arrow-alt'></i>
                                                    )
                                                ) : null

                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                            </thead>
                        ) : null
                    }
                    {
                        data && props.renderBody ? (
                            <tbody>
                            {
                                dataShow.map((item, index) => props.renderBody(item, index))
                            }
                            </tbody>
                        ) : null
                    }
                </table>
            </div>
            {
                totalPages > 1 ? (
                    <div className="table__pagination">
                        {
                            range.map((item, index) => (
                                <div
                                    key={index}
                                    className={`table__pagination-item ${
                                        currentPage === index  ? "active" : ""
                                    }`}
                                    onClick={() => handleClick(index + 1)}

                                >
                                    {index + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
