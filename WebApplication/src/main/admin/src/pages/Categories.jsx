import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import {useTranslation} from "react-i18next";
import i18n from '../locales/i18n';
import fetchCategories from "../constants/Categories";
import Categories from "../services/Categories";
import CreateUserModal from "../components/modal/CreateUserModal";
import AddCategories from "../components/modal/AddCategories";

const customerTableHead = [
    {key: "number", label: "#"},
    {key: "name", label: "categories.name"},
    {
        key: "slug",
        label: "categories.slug"
    }, {key: "level", label: "categories.level"}, {key: "parentId", label: "categories.parentId"}, {
        key: "pathIcon",
        label: "categories.pathIcon"
    }, {
        key: "action",
        label: "products.action"
    }
]


const renderBody = (item, index) => {
    const {id, name, slug, sortOrder, level, pathIcon, parentId, showWeb} = item;
    return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{slug}</td>
        <td>{level}</td>
        <td>{parentId}</td>
        <td>{pathIcon}</td>
        <td>
        </td>

    </tr>)

}


const Customers = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState('asc');
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const response = await Categories.getAllCategories(currentPage, pageSize, searchTerm, sortOrder, sortColumn);
            setCategories(response.data.results);
            setLoading(false);
        };
        getCategories();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page); //trừ 1 vì page bắt đầu từ 0
        console.log(page)
    }, []);
    const handleSort = useCallback((column) => {
        setSortColumn(column);
        if (sortOrder === 'asc') {
            setSortOrder('desc')
        } else {
            setSortOrder('asc')
        }
    }, [sortColumn, sortOrder]);
    const {t} = useTranslation();
    return (<>

        <div>
            <h2 className="page-header">
                {t('categories.title')}
            </h2>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="user-register">
                            <button onClick={openModal}>
                                <i className='bx bx-plus'></i>
                            </button>

                            <AddCategories showModal={showModal} closeModal={closeModal}/>
                        </div>
                        <div className="card__body">
                            <div className="search-container">
                                <input
                                    type="search"
                                    placeholder="Tìm kiếm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                            </div>
                            {loading ? <div>Loading...</div> : (<Table
                                limit={pageSize}
                                headData={customerTableHead}
                                data={categories}
                                renderBody={(item, index) => renderBody(item, index)}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onChangePage={handlePageChange}
                                pageSize={pageSize}
                                sortColumn={sortColumn}
                                sortOrder={sortOrder}
                                onSort={handleSort}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Customers;
