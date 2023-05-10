import React, {useCallback, useEffect, useState} from "react";
import Table from "../components/table/Table";
import {useTranslation} from "react-i18next";
import BrandsService from "../services/BrandsService";
import {toast} from "react-toastify";
import AddBrands from "../components/modal/brands/AddBrands";
import EditBrands from "../components/modal/brands/EditBrands";
import InventoryService from "../services/InventoryService";
const customerTableHead = [
    {key: "number", label: "#"},
    {key: "name", label: "brands.name"},
    {
        key: "slug",
        label: "brands.slug"
    }, {
        key: "pathLogo",
        label: "brands.pathLogo"
    },
    {
        key: "description",
        label: "brands.description"
    },
    {
        key: "action",
        label: "products.action"
    }
]





const Inventory = () => {
    const [brands, setBrands] = useState([]);
    console.log(brands)
    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [brandId, setBrandId] = useState(null);

    const renderBody = (item, index) => {

        const {id, name, slug,  description,pathLogo } = item;
        const handleEditClick = () => {
            setBrandId(id);
        };
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{slug}
            </td>
            <td>{pathLogo}</td>
            <td>{description}</td>
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
                                BrandsService.deleteBrand(id).then((res) => {
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
        const getAllInventory = async () => {
            try {
                const response = await InventoryService.getAllInventory();
                const {data} = response;
                setBrands(data.results);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getAllInventory();
      
    }, [pageSize, searchTerm, changes]);


    const {t} = useTranslation();
    return (<>

        <div>
            <h2 className="page-header">
                {t('brands.title')}
            </h2>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="card__body">
                            {loading ? <div>Loading...</div> : (<Table
                                limit={pageSize}
                                headData={customerTableHead}
                                data={brands}
                                renderBody={(item, index) => renderBody(item, index)}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default Inventory;
