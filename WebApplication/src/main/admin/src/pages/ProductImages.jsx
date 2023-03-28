import React, {useState, useEffect} from "react";

import Table from "../components/table/Table";
import "./products.css"
import DropFileInput from "../components/drop-file-input/DropFileInput";
import ProductsService from "../services/ProductsService";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ProductImages = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    console.log(images)
    const params = useParams();
    const {id} = params;

    const onFileChange = (files) => {
        setFiles(files)
    }

    useEffect(() => {
        async function getImages() {
            try {
                setLoading(true)
                const response = await ProductsService.getProductImage(id);
                if (response.status === 200) {
                    setImages(response.data.results)
                    setLoading(false)
                }
            } catch (e) {
                console.log(e)
            }
        }

        getImages();

    }, [id])
    const saveProductImage = async () => {
        try {
            const data = new FormData();
            files.map((file, index) => {
                data.append(`file[${index}]`, file.file)
                data.append(`file[${index}]thumbnail`, file.isThumbnail)
                console.log(`file[${index}]`, file.file)
                console.log(`file[${index}]thumbnail`, file.isThumbnail)
            })
            const response = await ProductsService.saveProductImage(id, data);
            if (response.status === 200) {
                toast.success("Thêm ảnh thành oông", {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate("/products")

            }
        } catch (e) {
            console.log(e)
        }
    }


    return (<div>
        <h2 className="page-header">
            Ảnh sản phẩm
        </h2>
        <div className="row">
            <div className="col-12">

                <div className="card">
                    <div className="card__body">
                        <DropFileInput onFileChange={(files) => onFileChange(files)}/>
                        {files.length > 0 ?
                            <button className="btn-submit" onClick={saveProductImage}>Lưu</button> : null}

                    </div>
                </div>
                <div className="card">
                    <div className="card__body">
                        {images.length > 0 ? (<div className="drop-file-preview">
                            <p className="drop-file-preview__title">
                                Danh sách ảnh
                            </p>
                            {images.map((item, index) => (

                                <div key={index} className="drop-file-preview__item">
                                    <img src={`http://localhost:6868/${item.url}`} alt="" style={{
                                        objectFit: 'cover', backgroundSize: 'cover', backgroundPosition: 'center',

                                    }}/>
                                    <div className="drop-file-preview__item__info">
                                        <p className="drop-file-preview__item__info__name">
                                            {item.url.split('/').pop()}
                                        </p>
                                    </div>
                                    <span className="drop-file-preview__item__check">
                                        <input
                                            type="checkbox"
                                            checked={item.thumbnail}
                                        />
</span>

                                    <span className="drop-file-preview__item__del">x</span>
                                </div>))}
                        </div>) : null}
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ProductImages;
