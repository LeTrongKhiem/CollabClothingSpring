import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import {useTranslation} from "react-i18next";
import AddCategories from "../components/modal/AddCategories";
import CategoriesService from "../services/CategoriesService";
import EditCategories from "../components/modal/EditCategories";
import {toast} from "react-toastify";
import Loading from "../components/loading/Loading";
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





const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryId, setCategoryId] = useState(null);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const openEditModal = () => {
        setEditModal(true);
    }
    const closeEditModal = () => {
        setEditModal(false);
    }
    const renderBody = (item, index) => {

        const {id, name, slug, sortOrder, level, pathIcon, parentId, showWeb} = item;
        const handleEditClick = () => {
            setCategoryId(id);
            openEditModal();
        };
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{slug}</td>
            <td>{level}</td>
            <td>{parentId}</td>
            <td>{pathIcon}</td>
            <td>
                <button className="btn" style={
                    {
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "1rem",

                    }
                } onClick={handleEditClick}>
                    <i className='bx bx-edit'></i>
                </button>

                <button className="btn btn-danger btn-sm"
                        style={
                            {
                                outline: "none",
                                border: "none",
                                backgroundColor: "transparent",
                                fontSize: "1rem",
                                margin:"0 5px"

                            }
                        }
                        onClick={ () =>{
                    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                        CategoriesService.deleteCategory(id).then((res) => {
                            if (res.status === 200) {
                                setChanges(true)
                                toast.success("Xóa thành công", {
                                    position: toast.POSITION.TOP_CENTER
                                });

                            }
                        }).catch((err) => {
                            toast.error("Xóa thất bại", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                    }

                    }
                }
                >
                    <i className='bx bx-trash'></i>
                </button>

            </td>

        </tr>)

    }
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const response = await CategoriesService.getAllCategories(currentPage, pageSize, searchTerm, sortOrder, sortColumn);
            setCategories(response.data.results);
            setLoading(false);
            setChanges(false);
        };
        getCategories();
    }, [pageSize, currentPage, searchTerm, sortColumn, sortOrder, changes]);

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
                            <EditCategories showModalEdit={editModal} closeModalEdit={closeEditModal} categoryId={categoryId} setChanges={setChanges}/>
                            <AddCategories showModal={showModal} closeModal={closeModal} setChanges={setChanges}/>
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
                            {loading ? <Loading/> : (<Table
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

export default Categories;
