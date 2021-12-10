import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesForRegistrationByName, saveCompanyToRedux, getAllCompanyForRegistration } from '../redux/actions/registed_service';
import { Link } from 'react-router-dom';
import '../css/search_bar.css'

const ServiceRegistration_Company = () => {
    const data = useSelector(state => state.registeredService.data)
    const location = useLocation();

    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("")
    useEffect(() => {
        dispatch(getAllCompanyForRegistration());
        return () => {
            console.log(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])


    const viewRegisteredServices = (item) => {
        // Đẩy dữ liệu company mà mình click lên redux để component sau lấy xuống
        dispatch(saveCompanyToRedux(item))
    }

    const searchBarChange = (e) => {
        setCompanyName(e.target.value)
    }

    const findCompaniesByNameClick = () => {
        dispatch(getCompaniesForRegistrationByName(companyName))
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
                            <form action="javascript:" class="search-bar" style={{ marginRight: "-45px" }}>
                                <input value={companyName} onChange={(e) => { searchBarChange(e) }} type="search" name="search" pattern=".*\S.*" required />
                                <button onClick={() => { findCompaniesByNameClick() }} class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>
                        </div>

                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên công ty</th>
                                        <th style={{ width: '200px' }}>Lĩnh vực hoạt động</th>
                                        <th style={{ width: '200px' }}>Mã số thuế</th>
                                        <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }} >Sô nhân viên</th>
                                        <th style={{ width: '200px' }}>Tổng diện tích mặt bằng</th>
                                        <th style={{ width: '105px' }}>Dịch vụ</th>
                                    </tr>
                                    {
                                        data?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.activeField}</td>
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