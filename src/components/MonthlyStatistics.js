import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import '../css/select_option.css'
import { getAllMonth } from '../redux/actions/month';
import { getAllMonthlyStatsOfCompanies } from '../redux/actions/monthly_statistics';

const MonthlyStatistics = () => {
    const statistics = useSelector(state => state.monthlyStatistics.data)
    const location = useLocation();
    const months = useSelector(state => state.months.data)
    const [selectedMonth,setSelectedMonth] = useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMonth())
        setTimeout(()=>{
            dispatch(getAllMonthlyStatsOfCompanies(months[0]))
        },300)
    }, [location.pathname])

    const onSelectChanged=(e)=>{
        const monthString = e.target.value
        setSelectedMonth(monthString)
        setTimeout(()=>{
        const monthInt = monthString.split(" ")[1]
        console.log(monthInt)
        const yearInt = monthString.split(" ")[3]
        console.log(yearInt)
        let selectedMonthItem = null
        months.forEach(month=>{
            if(month.month==monthInt && month.year==yearInt){
                selectedMonthItem=month;
            }
        })
        console.log("check",selectedMonthItem)
        dispatch(getAllMonthlyStatsOfCompanies(selectedMonthItem))
        },100)
    }

    const onThongKe = ()=>{
        

    }

    return (
        <>
            <div style={{ position: 'relative' }} >
                <div style={{ maxWidth: "1500px", minHeight: "100vh" }} className="admin-post__container">
                    <div className="admin-post__wrapper">
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Thống kê doanh thu các công ty đem lại theo {selectedMonth}
                            </div>

                        </div>
                        <div className="admin-post__head">
                            <div className="selectdiv">
                                <label style={{display:"block"}}>
                                    <select value={selectedMonth} onChange={(e)=>{onSelectChanged(e)}}>
                                        {months.map((item,index)=>(
                                            <option key={index}>Tháng {item?.month} Năm {item?.year}</option>
                                        ))
                                        }
                                    </select>
                                </label>
                            </div>
                        </div>
                        
                        <div className="admin-post__body" >
                            <table id="admin-post__table" style={{ maxWidth: "1500px" }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên công ty</th>
                                        <th style={{ width: '300px' }}>Lĩnh vực hoạt động</th>
                                        <th style={{ width: '250px' }}>Mã số thuế</th>
                                        <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }}>Sô nhân viên</th>
                                        <th style={{ width: '200px' }}>Tổng diện tích mặt bằng</th>
                                        <th style={{ width: '200px' }}>Tổng tiền</th>
                                        <th style={{ width: '105px' }}>Chi tiết</th>
                                        
                                    </tr>
                                    {
                                        statistics?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.company?.name}</td>
                                                <td>{item?.company?.activeField}</td>
                                                <td>{item?.company?.taxCode}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.company?.authorizedCapital)}</td>
                                                <td>{item?.company?.phoneNo}</td>
                                                <td>{item?.company?.numberOfEmployee}</td>
                                                <td>{item?.company?.sumOfRentedArea}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.totalAmount)}</td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/monthly-statistics-details",
                                                        search: `?companyId=` + item?.company?.id+`&monthId=`+item?.month?.id,
                                                    }}>
                                                        <button className="post-edit-item-btn">
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

export default MonthlyStatistics;