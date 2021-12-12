import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { deleteRentedArea, getAllRentedAreas, getTheRestArea, updateRegisterdRentedArea } from '../redux/actions/rented_area';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../css/loading.css'
import { Link } from 'react-router-dom';
import { getFloorById } from '../redux/actions/floor';
import moment from 'moment';
function RentedArea() {
    const [iconLoad, setIconLoad] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch();
    const rentedAreaFromReducer = useSelector(state => state.rentedAreas.data)
    const floor = useSelector(state => state.floors.floor)
    const search = useLocation().search;
    const floorId = new URLSearchParams(search).get('floorId');
    const [registeredRentedArea, setregisteredRentedArea] = useState(null);

    const [rentedDate, setRentedDate] = useState(null)
    const [expiredDate, setExpiredDate] = useState(null)
    const [rentedArea, setRentedArea] = useState(null)
    const [position, setPosition] = useState(null)

    const [company, setCompany] = useState(null)

    const popUpEditForm = (item) => {
        setregisteredRentedArea(item)
        setRentedDate(item.rentedDate)
        setExpiredDate(item.expiredDate)
        setRentedArea(item.rentedArea)
        setPosition(item.position)
        setCompany(item.company)
        setIsShow(true)
        document.querySelector('.form-post').classList.add('active');
    }
    const cancelClick = () => {
        setIsShow(false)
    }
    const editRegisterdRentedArea = (item) => {
        if (item) {
            const copyOfRegisteredRentedArea = {
                ...item
            }
            setIconLoad(true);
            dispatch(updateRegisterdRentedArea(copyOfRegisteredRentedArea.id, copyOfRegisteredRentedArea))
            cancelClick();
            setTimeout(() => {
                dispatch(getAllRentedAreas(floorId))
                setIconLoad(false)
            }, 500)

        }
    }
    useEffect(() => {
        dispatch(getAllRentedAreas(floorId))
        dispatch(getFloorById(floorId))
        return () => {

        }
    }, [location.pathname])
    const removeRentedArea = (id) => {
        if (id) {
            setIconLoad(true)
            dispatch(deleteRentedArea(id));
            setTimeout(() => {
                dispatch(getAllRentedAreas(floorId))
                setIconLoad(false)
            }, 500)
        }
    }

    const expiredDateOnChange = (e) => {
        setExpiredDate(e.target.value)
        setregisteredRentedArea({
            ...registeredRentedArea,
            expiredDate: e.target.value
        })
    }
    return (
        <div style={{ position: 'relative' }}>
            <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                <div class="loader"></div>
            </div>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Gia hạn mặt bằng
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Tên công ty:</strong> {company?.name}</p>
                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Vị trí:</strong> {position}</p>
                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Diện tích thuê:</strong> {rentedArea}</p>
                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Ngày bắt đàu:</strong> {moment(rentedDate).format("DD-MM-YYYY")}</p>

                            </div>
                            <div className="form-post__field">
                                <p style={{ textAlign: "left" }}><strong>Ngày kết thúc:</strong></p>
                                <input onChange={(e) => { expiredDateOnChange(e) }} style={{ width: '100%' }} type="date" id='end-date' placeholder="Ngày kết thúc" />
                            </div>


                        </div>
                        <div className="form-post__control">
                            <button className="cancel-btn" onClick={() => cancelClick()}>
                                Hủy
                            </button>
                            <button className="add-section-btn" onClick={() => editRegisterdRentedArea(registeredRentedArea)} >
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
                            Danh sách các mặt bằng của {floor?.name}
                        </div>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <Link to={{
                                pathname: "/contract-registration",
                                search: `?floorId=` + floorId,
                            }}>
                                    Đăng ký mặt bằng tại {floor?.name}
                                
                            </Link>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '100px' }}>Vị trí</th>
                                    <th style={{ width: '200px' }}>Công ty thuê</th>
                                    <th style={{ width: '200px' }}>Diện tích thuê(m2)</th>
                                    <th style={{ width: '200px' }}>Ngày bắt đầu thuê</th>
                                    <th style={{ width: '200px' }}>Ngày kết thúc</th>
                                    <th style={{ width: '135px' }}>Gia hạn</th>
                                    <th style={{ width: '105px' }}>Xóa</th>
                                </tr>
                                {
                                    rentedAreaFromReducer?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.position}</td>
                                            <td>{item?.company?.name}</td>
                                            <td>{item?.rentedArea}</td>
                                            <td>{moment(item?.rentedDate).format("DD-MM-YYYY")}</td>
                                            <td>{moment(item?.expiredDate).format("DD-MM-YYYY")}</td>

                                            <td>
                                                <button className="post-edit-item-btn" style={{ width: 100 }} onClick={() => popUpEditForm(item)}>
                                                    <i className='bx bxs-pencil'></i>
                                                    Gia hạn
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeRentedArea(item.id)} >
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

export default RentedArea;