import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegisterdServices, deleteRegisterdService } from '../redux/actions/registed_service';
import PropTypes from 'prop-types';
import moment from 'moment';


ServiceRegistration_RegisteredServices.propTypes = {
    companyId: PropTypes.any
};

ServiceRegistration_RegisteredServices.default = {
    company: null
};

function ServiceRegistration_RegisteredServices(props) {
    const data = useSelector(state => state.registeredService.data)
    const [registeredServices, setRegisteredServices] = useState(data);
    // biến để show pop up sửa thông tin
    const [isShow, setIsShow] = useState(false)
    const location = useLocation();
    const [registeredService, setRegisteredService] = useState(null);
    const dispatch = useDispatch();

    // Lấy ra id company qua đường dẫn
    const search = useLocation().search;
    const companyId = new URLSearchParams(search).get('companyId');

    // Lấy dữ liệu công ty mà người dùng click ở component trước từ trên redux đã đẩy lên
    const company = useSelector(state => state.registeredService.company)
    useEffect(() => {

        dispatch(getAllRegisterdServices(companyId));
        console.log("use effect 1");
        return () => {
            console.log(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setRegisteredServices(data);
        console.log("=================", data)
        console.log("use effect 2");
    }, [data])

    const cancelRegisteredService = (registerdServiceId) => {
        if (registerdServiceId) {
            dispatch(deleteRegisterdService(registerdServiceId));
            window.location.reload();
        }
    }

    const popUpEditForm = (item) => {
        setRegisteredService(item)
        document.getElementById('start-date').value =moment(item.startDate).format("YYYY-DD-MM")
        document.getElementById('description').value = item.description
        setIsShow(true)
        document.querySelector('.form-post').classList.add('active');
    }

    const cancelClick = () => {
        setIsShow(false)
    }

    const editRegisterdService = () => {
        
    }



    return (
        <>
            <div style={{ position: 'relative' }}>
                <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                            Sửa thông tin đăng ký dịch vụ
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Tên công ty:</strong> {company?.name}</p>
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Tên dịch vụ:</strong> {registeredService?.service?.name}</p>
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Giá tiền tháng này:</strong> {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(registeredService?.currentPrice)}</p>
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Ngày bắt đàu:</strong></p>
                                    <input style={{ width: '100%' }} type="date" id='start-date' placeholder="Ngày bắt đầu" />
                                </div>

                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Mô tả</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='description' placeholder="Mô tả" />
                                </div>

                            </div>
                            <div className="form-post__control">
                                <button onClick={() => cancelClick()} className="cancel-btn">
                                    Hủy
                                </button>
                                <button className="add-section-btn" onClick={() => editRegisterdService()}>
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
                                Các dịch vụ mà công ty <span style={{ color: "red", fontSize: "30px" }}>{company?.name}</span> đã đăng ký:
                                <br />

                            </div>

                        </div>
                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Dịch vụ</th>
                                        <th style={{ width: '200px' }}>Ngày bắt đầu sử dụng</th>
                                        <th style={{ width: '200px' }}>Giá tiền tháng này</th>
                                        <th style={{ width: '200px' }}>Mô tả</th>
                                        <th style={{ width: '200px' }}>Cập nhật thông tin</th>
                                        <th style={{ width: '200px' }} >Hủy dịch vụ</th>
                                    </tr>
                                    {
                                        registeredServices?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.service?.name}</td>
                                                <td>{item?.startDate}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.currentPrice)}</td>
                                                <td>{item?.description}</td>
                                                <td>
                                                    <button onClick={() => popUpEditForm(item)} className="post-edit-item-btn">
                                                        <i className='bx bxs-pencil'></i>
                                                        SỬA
                                                    </button>
                                                </td>
                                                <td>
                                                    {item?.service?.required === 0 ?
                                                        <button onClick={() => cancelRegisteredService(item?.id)} className="post-delete-btn">
                                                            <i className='bx bx-trash'></i>HỦY
                                                        </button>
                                                        :
                                                        <button className="post-disabled-btn">
                                                            <i className='bx bx-trash'></i> HỦY
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <i style={{ fontSize: "15px" }}>(Chú ý: giá hiện tại tháng này của mỗi dịch vụ được tính bằng công thức: công ty dưới 10 người và thuê dưới 100 m2 thì có cùng mức giá dịch vụ cho mỗi dịch vụ
                                , cứ thêm 5 người hoặc thêm 10 m2 diện tích sàn thì đơn giá tăng lên 5% cho mỗi mục. Tiền dịch vụ được tính
                                từ ngày đăng ký, hoặc từ đầu tháng đến thời điểm hiện tại. Số tiền dịch vụ
                                được tính bằng tỉ lệ giữa ngày đã sử dụng trên tổng số ngày trong tháng))</i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceRegistration_RegisteredServices;

