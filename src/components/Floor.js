import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { getAllFloors, deleteFloor, createNewFloor, updateFloor } from '../redux/actions/floor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Floor() {

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

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditFloor(index);
        document.getElementById('name').value = floorsFromReducer[index].name;
        document.getElementById('price-per-m2').value = floorsFromReducer[index].pricePerM2;
        document.getElementById('ground-area').value = floorsFromReducer[index].groundArea;
        document.querySelector('.form-post').classList.add('active');
    }
    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa thông tin tầng này";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm mới tầng";
        }
    }
    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    }
    const addOrUpdateItem = () => {
        if (isAdd) {
            addItem();
        }
        else {
            editCompany();
        }

        cancelClick();
        window.location.reload();
    }
    const editCompany = () => {
        const name = document.getElementById('name').value;
        const pricePerM2 = document.getElementById('price-per-m2').value;
        const groundArea = document.getElementById('ground-area').value;


        const data = {
            name: name,
            pricePerM2: pricePerM2,
            groundArea: groundArea

        }
        dispatch(updateFloor(floorsFromReducer[indexEditFloor].id, data));
        window.location.reload();
    }
    const removeFloor = (id) => {
        if (id) {
            dispatch(deleteFloor(id));
            window.location.reload();
        }
    }
    const addItem = () => {
        const name = document.getElementById('name').value;
        const pricePerM2 = document.getElementById('price-per-m2').value;
        const groundArea = document.getElementById('ground-area').value;

        const data = {
            name: name,
            pricePerM2: pricePerM2,
            groundArea: groundArea

        }

        dispatch(createNewFloor(data));

        cancelClick();
        window.location.reload();
    }
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Thêm mới tầng
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='name' placeholder="Tên" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='price-per-m2' placeholder="Giá / m2" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='ground-area' placeholder="Tổng diện tích" />
                            </div>

                        </div>
                        <div className="form-post__control">
                            <button className="cancel-btn" onClick={() => cancelClick()}>
                                Hủy
                            </button>
                            <button className="add-section-btn" onClick={() => addOrUpdateItem()} >
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
                            <button onClick={() => popUpActive()}>
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
                                                <button className="post-edit-item-btn" onClick={() => editClick(index)} >
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