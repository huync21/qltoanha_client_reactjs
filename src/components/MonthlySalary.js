import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import '../css/select_option.css'
import { getAllMonth } from '../redux/actions/month';
import { getAllSalaryOfMonth } from '../redux/actions/monthly_salary';

const MonthlySalary = () => {
    const monthlySalaries = useSelector(state => state.monthlySalary.data)
    const location = useLocation();
    const months = useSelector(state => state.months.data)
    const [selectedMonth,setSelectedMonth] = useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMonth())
        setTimeout(()=>{
            dispatch(getAllSalaryOfMonth(months[0]))
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
        dispatch(getAllSalaryOfMonth(selectedMonthItem))
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
                                Thống kê lương tháng theo {selectedMonth}
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
                                        <th style={{ width: '200px' }}>Tên</th>

                                        <th style={{ width: '200px' }}>Địa chỉ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }}>Vị trí</th>
                                        <th style={{width:'200px'}}>Bậc lương</th>
                                        <th style={{ width: '200px' }}>Lương tháng</th>
                                    </tr>
                                    {
                                        monthlySalaries?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.empName}</td>
                                                
                                                <td>{item?.address}</td>
                                                <td>{item?.phoneNo}</td>
                                                <td>{item?.position}</td>
                                                <td>Bậc {item?.salaryLevel}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.salary)}</td>
                                                
                                                
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

export default MonthlySalary;