import React, {useEffect, useState} from 'react'

import './table.css'

const Table = props => {

    const {totalPages, onChangePage, data, pageSize, currentPage, handlePageChange} = props;
    const [dataShow, setDataShow] = useState([])
    console.log(dataShow)
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


    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData && props.renderHead ? (
                            <thead>
                            <tr>
                                {
                                    props.headData.map((item, index) => props.renderHead(item, index))
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
