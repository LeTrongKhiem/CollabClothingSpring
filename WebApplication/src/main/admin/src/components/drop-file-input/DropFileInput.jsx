import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

// import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/img/cloud-upload-regular-240.png';

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    console.log(fileList)
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    console.log("img", imagePreviewUrl)
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        const reader = new FileReader();
        if (newFile) {
            const updatedList = [...fileList, newFile];
            reader.onloadend = () => {
                const updatedPreviewList = [...imagePreviewUrl, reader.result];
                setImagePreviewUrl(updatedPreviewList);
            };
            reader.readAsDataURL(newFile);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        const updatedPreviewList = [...imagePreviewUrl];
        updatedPreviewList.splice(fileList.indexOf(file), 1);
        setImagePreviewUrl(updatedPreviewList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt=""/>
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (

                                <div key={index} className="drop-file-preview__item">
                                    <img src={imagePreviewUrl[index]} alt="" style={{
                                        objectFit: 'cover',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',

                                    }
                                    }/>
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del"
                                          onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;