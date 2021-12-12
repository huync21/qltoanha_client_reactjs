import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { getAllFloors, deleteFloor, createNewFloor, updateFloor } from '../redux/actions/floor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/loading.css'
import '../css/floor-validation.css';
function Floor() {

    const [iconLoad, setIconLoad] = useState(false)
    const [name, setName] = useState(null);
    const [pricePerM2, setPricePerM2] = useState(null);
    const [groundArea, setGroundArea] = useState(null);

    const [isShow, setIsShow] = useState(false)
    const [isAdd, setIsAdd] = useState(false);
    const [indexEditFloor, setIndexEditFloor] = useState(null);
    const location = useLocation()
    const dispatch = useDispatch();
    const floorsFromReducer = useSelector(state => state.floors.data)

    useEffect(() => {
        dispatch(getAllFloors())
        return () => {

        }
    }, [location.pathname])
    const editClick = (item) => {
        const nameFloorTag = document.querySelector("#name-floor");
        const pricePerM2Tag = document.querySelector("#price-per-M2");
        const groundAreaTag = document.querySelector("#ground-area");
        nameFloorTag.parentElement.classList.remove("empty");
        pricePerM2Tag.parentElement.classList.remove("empty");
        groundAreaTag.parentElement.classList.remove("empty");
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        setIsAdd(false);
        setName(item.name);
        setPricePerM2(item.pricePerM2);
        setGroundArea(item.groundArea);
        setIndexEditFloor(item.id);
    }
    const addClick = () => {
        const nameFloorTag = document.querySelector("#name-floor");
        const pricePerM2Tag = document.querySelector("#price-per-M2");
        const groundAreaTag = document.querySelector("#ground-area");
        nameFloorTag.parentElement.classList.remove("empty");
        pricePerM2Tag.parentElement.classList.remove("empty");
        groundAreaTag.parentElement.classList.remove("empty");
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        setIsAdd(true);
        setName("");
        setPricePerM2("");
        setGroundArea("");
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onPricePerM2Change = (e) => {
        setPricePerM2(e.target.value)
    }
    const onGroundAreaChange = (e) => {
        setGroundArea(e.target.value)
    }
    const editFloor = () => {
        const data = {
            name: name,
            pricePerM2: pricePerM2,
            groundArea: groundArea
        }
        setIconLoad(true)
        dispatch(updateFloor(indexEditFloor, data));
        setTimeout(() => {
            dispatch(getAllFloors())
            setIconLoad(false)
        }, 500)
        cancelClick();
    }
    const addFloor = () => {
        const data = {
            name: name,
            pricePerM2: pricePerM2,
            groundArea: groundArea
        }
        setIconLoad(true)
        dispatch(createNewFloor(data));
        setTimeout(() => {
            dispatch(getAllFloors())
            setIconLoad(false)
        }, 500)
        cancelClick();
    }
    const removeFloor = (id) => {
        if (id) {
            setIconLoad(true)
            dispatch(deleteFloor(id));
            setTimeout(() => {
                dispatch(getAllFloors())
                setIconLoad(false)
            }, 500)

        }
    }
    const addOrUpdateFloor = () => {

        const nameFloorTag = document.querySelector("#name-floor");
        const pricePerM2Tag = document.querySelector("#price-per-M2");
        const groundAreaTag = document.querySelector("#ground-area");
        nameFloorTag.parentElement.classList.remove("empty");
        pricePerM2Tag.parentElement.classList.remove("empty");
        groundAreaTag.parentElement.classList.remove("empty");
        let count = 0;
        if (name.trim().length < 1) {
            nameFloorTag.parentElement.classList.add("empty");
            count++;
        }
        if (pricePerM2.toString().trim().length < 1) {
            pricePerM2Tag.parentElement.classList.add("empty");
            count++;
        }
        if (groundArea.toString().trim().length < 1) {
            groundAreaTag.parentElement.classList.add("empty");
            count++;
        }

        if (count > 0) return;
        if (isAdd) {
            addFloor();
        }
        else editFloor();
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    }

    const onSubmit = () => (data) => {
        console.log(data);
    }
    return (
        <div style={{ position: 'relative' }}>
            <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                <div class="loader"></div>
            </div>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    {isAdd ? <div className="form-post__title dialog__title">
                        Thêm mới tầng
                    </div> : <div className="form-post__title dialog__title">
                        Sửa thông tin
                    </div>}

                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field .floor-form">
                                <p style={{ textAlign: "left" }}><strong>Tên Tầng</strong></p>
                                <input value={name} onChange={(e) => { onNameChange(e) }} style={{ width: '100%' }} type="text" id='name-floor' placeholder="tên"
                                />

                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Giá tiền/m2</strong></p>
                                <input value={pricePerM2} onChange={(e) => { onPricePerM2Change(e) }} style={{ width: '100%' }} type="number" id='price-per-M2' placeholder="Giá tiền"
                                />
                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Diện tích tầng</strong></p>
                                <input value={groundArea} onChange={(e) => { onGroundAreaChange(e) }} style={{ width: '100%' }} type="number" id='ground-area' placeholder="Diện tích"
                                />
                            </div>
                        </div>
                        <div className="form-post__control">
                            <button className="cancel-btn" onClick={() => cancelClick()}>
                                Hủy
                            </button>
                            <button className="add-section-btn" onClick={() => addOrUpdateFloor()} >
                                <i className='bx bx-save'></i>
                                Lưu
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh sách các tầng
                        </div>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button onClick={() => addClick()}>
                                Thêm tầng
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '200px' }}>Tầng</th>
                                    <th style={{ width: '200px' }}>Diện tích(m2)</th>
                                    <th style={{ width: '200px' }}>Giá tiền /m2 1 tháng</th>
                                    <th style={{ width: '105px' }}>Danh sách mặt bằng</th>
                                    <th style={{ width: '105px' }}>Sửa</th>
                                    <th style={{ width: '105px' }} >Xóa</th>
                                </tr>
                                {
                                    floorsFromReducer?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.groundArea}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(item?.pricePerM2)}</td>


                                            <td>
                                                <Link to={{
                                                    pathname: "/rented-areas",
                                                    search: `?floorId=` + item?.id,
                                                }}>
                                                    <button className="post-edit-item-btn">
                                                        <i className='bx bxs-pencil'></i>
                                                        Xem
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="post-edit-item-btn" onClick={() => editClick(item)} >
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeFloor(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Floor;