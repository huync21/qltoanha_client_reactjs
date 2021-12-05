import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegisterdServices,deleteRegisterdService } from '../redux/actions/registed_service';
import PropTypes from 'prop-types';



ServiceRegistration_RegisteredServices.propTypes = {
    company: PropTypes.any
};

ServiceRegistration_RegisteredServices.default = {
    company: null
};

function ServiceRegistration_RegisteredServices(props) {
    const data = useSelector(state => state.registeredService.data)
    const [registeredServices, setRegisteredServices] = useState(data);
    const location = useLocation();
    const [registeredService, setRegisteredService] = useState(null);
    const dispatch = useDispatch();

    const company = useSelector(state => state.registeredService.company)
    useEffect(() => {   
        dispatch(getAllRegisterdServices(company));
        console.log("use effect 1");
        return () => {
            console.log(location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setRegisteredServices(data);
        console.log("=================",data)
        console.log("use effect 2");
    }, [data])

    const viewRegisteredServices = (item) => {
        
    }

    return (registeredService?
        <Redirect to={{
            pathname:"/company",
            state:{}
        }}/>
        :
        <>
        <div style={{position: 'relative'}}>
            <div style={{maxWidth: "1100px", minHeight: "100vh"}} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{fontSize: "20px", marginLeft: "-20px"}} className="admin-post__title">
                            Các dịch vụ mà công ty {} đã đăng ký:
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{width: '200px'}}>Service</th>
                                    <th style={{width: '200px'}}>Start Date</th>
                                    <th style={{width: '200px'}}>Current Price</th>
                                    <th style={{width: '200px'}}>Description</th>
                                    <th style={{width: '200px'}} >Cancel Service</th>               
                                </tr>
                                {
                                    registeredServices?.map((item, index) => (
                                        <tr key = {index}>
                                            <td>{index+1}</td>
                                            <td>chán vl bị lỗi</td>
                                            <td>{item.startDate}</td>
                                            <td>{item.currentPrice}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button onClick={() => viewRegisteredServices(item)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Cancel
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
}

export default ServiceRegistration_RegisteredServices;

