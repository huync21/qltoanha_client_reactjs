import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { getAllFloors } from '../redux/actions/floor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Floor() {
    const [isShow, setIsShow] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch();
    const floorsFromReducer = useSelector(state => state.floors.data)

    useEffect(() => {
        dispatch(getAllFloors())
        return () => {

        }
    }, [location.pathname])

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Thêm mới công ty
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
                            Danh sách các tầng
                        </div>
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button>
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

export default Floor;