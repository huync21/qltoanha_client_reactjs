import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { getAllRentedAreasOfCompany } from '../redux/actions/statistics_rented_areas';
import { getCompanyById } from '../redux/actions/company';
import { getAllMonthlyBills, getAllMonthlyServiceBills } from '../redux/actions/monthly_statistics_detail';
function MonthlyStatisticDetails() {

    const location = useLocation()
    const dispatch = useDispatch();
    const bills = useSelector(state => state.monthlyStatisticDetail.bills)
    const serviceBills = useSelector(state => state.monthlyStatisticDetail.serviceBills)

    const search = useLocation().search;
    const companyId = new URLSearchParams(search).get('companyId');
    const monthId = new URLSearchParams(search).get('monthId');

    useEffect(() => {
        dispatch(getAllMonthlyBills(companyId, monthId))
        dispatch(getAllMonthlyServiceBills(companyId, monthId))
        return () => {

        }
    }, [location.pathname])

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Chi tiết doanh thu tháng {bills[0]?.month?.month} năm {bills[0]?.month?.year} công ty <p style={{color:"red",display:"inline"}}>{bills[0]?.contract?.company?.name}</p> đem lại
                        </div>
                    </div>
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh sách hóa đơn tiền thuê mặt bằng của công ty
                        </div>
                    </div>
                    <div className="admin-post__body" style={{ marginBottom: "50px" }}>
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '100px' }}>Tầng</th>
                                    <th style={{ width: '100px' }}>Vị trí</th>
                                    <th style={{ width: '200px' }}>Diện tích thuê(m2)</th>
                                    <th style={{ width: '200px' }}>Ngày bắt đầu thuê</th>
                                    <th style={{ width: '200px' }}>Ngày kết thúc</th>
                                    <th style={{ width: '200px' }}>Giá tiền thuê /m2 1 tháng</th>
                                    <th style={{ width: '200px' }}>Tổng tiền</th>
                                </tr>
                                {
                                    bills?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.contract?.floor?.name}</td>
                                            <td>{item?.contract?.position}</td>
                                            <td>{item?.contract?.rentedArea}</td>
                                            <td>{moment(item?.contract?.rentedDate).format("DD-MM-YYYY")}</td>
                                            <td>{moment(item?.contract?.expiredDate).format("DD-MM-YYYY")}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(item?.contract?.floor?.pricePerM2)}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(item?.totalAmount)}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>

                    </div>

                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh sách hóa đơn tiền dùng dịch vụ của công ty
                        </div>
                    </div>
                    <div className="admin-post__body">
                    <table id="admin-post__table">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th style={{ width: '200px' }}>Dịch vụ</th>
                                            <th style={{ width: '200px' }}>Giá tiền cơ bản 1 tháng</th>
                                            <th style={{ width: '200px' }}>Loại dịch vụ</th>
                                            <th style={{ width: '200px' }}>Ngày bắt đầu đăng ký</th>
                                            <th style={{ width: '200px' }}>Tổng tiền</th>
                                        </tr>
                                        {
                                            serviceBills?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.serviceContract?.service?.name}</td>

                                                    <td>{new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item?.serviceContract?.service?.price)}</td>
                                                    <td>{item?.serviceContract?.service?.type}</td>

                                                    <td>{moment(item?.serviceContract?.startDate).format("DD-MM-YYYY")}</td>
                                                    <td>{new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item?.totalAmount)}</td>
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

export default MonthlyStatisticDetails;