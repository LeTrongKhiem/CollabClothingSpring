import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import UserService from "../services/UserService";
import CreateUserModal from "../components/modal/CreateUserModal";
import {useTranslation} from "react-i18next";
import i18n from '../locales/i18n';
const customerTableHead = [
    { key: "number", label: "#" },
    { key: "email", label: "customers.email" },
    { key: "lastName", label: "customers.lastName" },
    { key: "firstName", label: "customers.firstName" },
    { key: "dob", label: "customers.dob" },
    { key: "gender", label: "customers.gender" },
    { key: "phoneNumber", label:"customers.phone" },
    { key: "address", label: "customers.address" },
    { key: "emailVerified", label: "customers.emailVerified"},
    { key: "role", label: "customers.role" },
];



const renderBody = (item, index) => {
    const {email, lastName, firstName, dob, gender, phoneNumber, address, emailVerified, role, block} = item;
    const date = new Date(dob);
    const formatDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const verify = emailVerified ? "Đã xác thực" : "Chưa xác thực";

    const formatGender = () => {
        if (gender === 1) {
            return "Nam"
        } else if (gender === 2) {
            return "Nữ"
        } else {
            return "Khác"
        }

    }
    return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{email}</td>
        <td>{lastName}</td>
        <td>{firstName}</td>
        <td>{formatDate}</td>
        <td>{formatGender()}</td>
        <td>{phoneNumber}</td>
        <td>{address}</td>
        <td>{verify}</td>
        <td>{role}</td>


    </tr>)

}


const Customers = () => {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(2);
    // const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [sortColumn, setSortColumn] = useState("lastName");
    const [sortOrder, setSortOrder] = useState('asc');
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await UserService.getAllUsers(currentPage, pageSize, searchTerm,sortOrder,sortColumn);
            const total = await  UserService.getTotalsUser();
            setCustomerList(response.data);
            setLoading(false);
            setTotalPages(Math.ceil(total.data.length / pageSize));
            if(searchTerm !== ''){
                setTotalPages(Math.ceil(response.data.length / pageSize));
            }
        };
        getUsers();
    }, [pageSize, currentPage, searchTerm,sortColumn,sortOrder]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page ); //trừ 1 vì page bắt đầu từ 0
        console.log(page)
    }, []);
    const handleSort = useCallback((column) => {
        setSortColumn(column);
        if(sortOrder === 'asc'){
            setSortOrder('desc')
        }else {
            setSortOrder('asc')
        }
    }, [sortColumn, sortOrder]);
    const {t} = useTranslation();
    return (<>

        <div>
            <h2 className="page-header">
                {t('customers.title')}
            </h2>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="user-register">
                        <button onClick={openModal}>
                            <i className='bx bx-plus'></i>

                        </button>


                        <CreateUserModal showModal={showModal} closeModal={closeModal}/>
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
                            {loading ? <div>Loading...</div> : (
                                <Table
                                    limit={pageSize}
                                    headData={customerTableHead}
                                    data={ customerList}
                                    renderBody={(item, index) => renderBody(item, index)}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onChangePage={handlePageChange}
                                    pageSize={pageSize}
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Customers;
