import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { getAllRentedAreas, getTheRestArea } from '../redux/actions/rented_area';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function RentedArea() {
    const [isShow, setIsShow] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch();
    const rentedAreaFromReducer = useSelector(state => state.rentedAreas.data)

    const search = useLocation().search;
    const floorId = new URLSearchParams(search).get('floorId');
    

    useEffect(() => {
        dispatch(getAllRentedAreas(floorId))
        
        return () => {

        }
    }, [location.pathname])

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Đăng ký mặt bằng
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='name' placeholder="Name" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='tax-code' placeholder="Tax code" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='authorized-capital' placeholder="Authorized Capital" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='phone-no' placeholder="Phone No" />
                            </div>
                        </div>
                        <div className="form-post__control">
                            <button className="cancel-btn">
                                Hủy
                            </button>
                            <button className="add-section-btn" >
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
                            Danh sách các mặt bằng của
                        </div>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <Link to={{
                                pathname: "/contract-registration",
                                search: `?floorId=` + floorId,
                            }}>
                            <button>
                            Đăng ký mặt bằng
                            </button>
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
                                    <th style={{ width: '105px' }}>Sửa</th>
                                    <th style={{ width: '105px' }}>Xóa</th>
                                </tr>
                                {
                                    rentedAreaFromReducer?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.position}</td>
                                            <td>{item?.company?.name}</td>
                                            <td>{item?.rentedArea}</td>
                                            <td>{item?.startDate}</td>
                                            <td>{item?.endDate}</td>

                                            <td>
                                                <button className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" >
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