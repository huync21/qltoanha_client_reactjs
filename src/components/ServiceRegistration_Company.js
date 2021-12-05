import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../redux/actions/company';
import { Link } from 'react-router-dom';
import ServiceRegistration_RegisteredServices from './ServiceRegistration_RegisteredServices';
import { saveCompanyToRedux } from '../redux/actions/registed_service';

const ServiceRegistration_Company = () => {
    const data = useSelector(state => state.company.data)
    const [companies, setCompanies] = useState(data);
    const location = useLocation();
    const [company, setCompany] = useState(null);

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
        setCompany(item);
        dispatch(saveCompanyToRedux(item))
    }

    return (company ?
        <Redirect
            to={{
                pathname:"/service-registration/registered-services",
                state:{company:company}
            }}
        />
        :
        <>
            <div style={{ position: 'relative', display: company? 'none':'block'}} >
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
                                        <th style={{ width: '200px' }}>Name</th>
                                        <th style={{ width: '200px' }}>Tax code</th>
                                        <th style={{ width: '200px' }}>Authorized Capital</th>
                                        <th style={{ width: '200px' }}>Phone No</th>
                                        <th style={{ width: '200px' }} >Employees</th>
                                        <th style={{ width: '200px' }}>Sum Of Rented Area</th>
                                        <th style={{ width: '105px' }}>Services</th>
                                    </tr>
                                    {
                                        companies?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.taxCode}</td>
                                                <td>{item.authorizedCapital}</td>
                                                <td>{item.phoneNo}</td>
                                                <td>{item?.numberOfEmployee}</td>
                                                <td>{item?.sumOfRentedArea}</td>
                                                <td>
                                                   
                                                        <button onClick={() => viewRegisteredServices(item)} className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            View
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
        </>
    )
};

export default ServiceRegistration_Company;