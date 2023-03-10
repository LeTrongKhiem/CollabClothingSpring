import React, {useEffect, useState} from "react";
import Table from "../components/table/Table";
import UserService from "../services/UserService";

const customerTableHead = ['#', //Thêm cột số thứ tự
    'email', 'Họ', 'Tên', 'Ngày sinh','Giới tính', 'Số điện thoại', 'Địa chỉ','Xác thực', 'Vai trò',

]


const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => {
    const {email, lastName, firstName, dob,gender, phoneNumber, address, emailVerified,role} = item;
    const date = new Date(dob);
   const formatDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
   const verify = emailVerified ? "Đã xác thực" : "Chưa xác thực";
   const formatGender = () => {
       if(gender === 1){
           return "Nam"
       }
       else if (gender === 2){
              return "Nữ"
       }
         else {
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
console.log(renderBody)

const Customers = () => {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(true);


    console.log(customerList)
    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setCustomerList(response.data);
            setLoading(false);
        })
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
                            {loading ? <div>Loading...</div> : (<Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Customers;
