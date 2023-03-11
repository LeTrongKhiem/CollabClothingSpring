import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import UserService from "../services/UserService";

const customerTableHead = ['#', //Thêm cột số thứ tự
    'email', 'Họ', 'Tên', 'Ngày sinh', 'Giới tính', 'Số điện thoại', 'Địa chỉ', 'Xác thực', 'Vai trò','Trang thái',

]


const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => {
    const {email, lastName, firstName, dob, gender, phoneNumber, address, emailVerified, role, block} = item;
    const date = new Date(dob);
    const formatDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const verify = emailVerified ? "Đã xác thực" : "Chưa xác thực";
    const status = block ? <i className='bx bx-block'></i> : <i className='bx bx-check'></i>;
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
        <td>{status}</td>

    </tr>)

}
console.log(renderBody)

const Customers = () => {
    const [customerList, setCustomerList] = useState([]);
    const [originalCustomerList, setOriginalCustomerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(2);
    // const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const response = await UserService.getAllUsers(currentPage, pageSize);
            console.log("api",currentPage)
            const total = await  UserService.getTotalsUser();
            setCustomerList(response.data);
            setOriginalCustomerList(response.data);
            setLoading(false);
            setTotalPages(Math.ceil(total.data.length / pageSize));
        };
        getUsers();
    }, [pageSize, currentPage,]);
    const handleSearch = useCallback(() => {
        const results = originalCustomerList.filter(customer =>
            Object.values(customer)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setCustomerList(results);
    }, [searchTerm, originalCustomerList]);
    useEffect(() => {
        handleSearch();
    }, [searchTerm, handleSearch]);
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page ); //trừ 1 vì page bắt đầu từ 0
        console.log(page)
    }, []);

    return (<>

        <div>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
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
                                    renderHead={(item, index) => renderHead(item, index)}
                                    data={ customerList}
                                    renderBody={(item, index) => renderBody(item, index)}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onChangePage={handlePageChange}
                                    pageSize={pageSize}
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
