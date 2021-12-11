import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import '../css/loading.css'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegisterdServices, deleteRegisterdService, updateRegisterdService } from '../redux/actions/registed_service';
import moment from 'moment';
import { getCompanyById } from '../redux/actions/company';


function ServiceRegistration_RegisteredServices() {
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

    // Lấy dữ liệu công ty mà người dùng click từ trên redux đã đẩy lên
    const company = useSelector(state => state.company.company)

    const [startDate, setStartDate] = useState(null)
    const [description, setDescription] = useState("")

    const [iconLoad, setIconLoad] = useState(false)
    useEffect(() => {
        dispatch(getAllRegisterdServices(companyId));
        dispatch(getCompanyById(companyId))
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setRegisteredServices(data);
    }, [data])

    // Gọi api hủy dịch vụ
    const cancelRegisteredService = (registerdServiceId) => {
        if (registerdServiceId) {
            dispatch(deleteRegisterdService(registerdServiceId));
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllRegisterdServices(companyId));
                setIconLoad(false)
            }, 500)
        }
    }

    // Mở pop up edit item
    const popUpEditForm = (item) => {
        setRegisteredService(item)
        setStartDate(moment(item.startDate, 'DD-MM-YYYY', true).format("YYYY-MM-DD"))
        setDescription(item.description)
        setIsShow(true)
        document.querySelector('.form-post').classList.add('active');
    }

    // Tắt pop up
    const cancelClick = () => {
        setIsShow(false)
        setStartDate(null)
        setDescription("")
    }

    const onStartDateChange = (e) => {
        setStartDate(e.target.value)
        setRegisteredService({
            ...registeredService,
            startDate: moment(e.target.value).format("DD-MM-YYYY")
        })
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
        setRegisteredService({
            ...registeredService,
            description: e.target.value
        })
    }

    const editRegisterdService = (item) => {
        if (item) {
            const copyOfRegisteredService = {
                ...item
            }
            dispatch(updateRegisterdService(copyOfRegisteredService.id, copyOfRegisteredService))
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllRegisterdServices(companyId));
                setIconLoad(false)
                setIsShow(false)
                setStartDate(null)
                setDescription("")
            }, 500)

        }
    }




    return (
        <>
            <div style={{ position: 'relative' }}>
                <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
                </div>
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
                                    <input value={startDate} onChange={(e) => { onStartDateChange(e) }} style={{ width: '100%' }} type="date" id='start-date' placeholder="Ngày bắt đầu" />
                                </div>

                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Mô tả</strong></p>
                                    <input value={description} onChange={(e) => { onDescriptionChange(e) }} style={{ width: '100%' }} type="text" id='description' placeholder="Mô tả" />
                                </div>

                            </div>
                            <div className="form-post__control">
                                <button onClick={() => cancelClick()} className="cancel-btn">
                                    Hủy
                                </button>
                                <button className="add-section-btn" onClick={() => editRegisterdService(registeredService)}>
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
                            <div style={{ right: '10px' }} className="admin-post__button">
                                <Link to={{
                                    pathname: "/service-registration/services",
                                    search: `?companyId=` + companyId,
                                }}>
                                    Đăng ký thêm dịch vụ
                                </Link>
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

