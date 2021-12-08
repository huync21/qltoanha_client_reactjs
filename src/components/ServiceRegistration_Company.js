import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../redux/actions/company';
import { saveCompanyToRedux } from '../redux/actions/registed_service';
import { Link } from 'react-router-dom';

const ServiceRegistration_Company = () => {
    const data = useSelector(state => state.company.data)
    const [companies, setCompanies] = useState(data);
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCompany());
        console.log("use effect 1");
        return () => {
            console.log(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setCompanies(data);
        console.log("use effect 2");
    }, [data])

    const viewRegisteredServices = (item) => {
        // Đẩy dữ liệu company mà mình click lên redux để component sau lấy xuống
        dispatch(saveCompanyToRedux(item))
    }

    return (
        <>
            <div style={{ position: 'relative' }} >
                <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                    <div className="admin-post__wrapper">
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Chọn công ty để đăng ký hoặc hủy dịch vụ
                            </div>
                        </div>
                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên công ty</th>
                                        <th style={{ width: '200px' }}>Mã số thuế</th>
                                        <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }} >Sô nhân viên</th>
                                        <th style={{ width: '200px' }}>Tổng diện tích mặt bằng</th>
                                        <th style={{ width: '105px' }}>Dịch vụ</th>
                                    </tr>
                                    {
                                        companies?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.taxCode}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.authorizedCapital)}</td>
                                                <td>{item?.phoneNo}</td>
                                                <td>{item?.numberOfEmployee}</td>
                                                <td>{item?.sumOfRentedArea}</td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/service-registration/registered-services",
                                                        search: `?companyId=` + item?.id,
                                                    }}>
                                                        <button onClick={() => viewRegisteredServices(item)} className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            Xem
                                                        </button>
                                                    </Link>
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
        </>
    )
};

export default ServiceRegistration_Company;