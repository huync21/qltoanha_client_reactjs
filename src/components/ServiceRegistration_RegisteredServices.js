import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { Redirect, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegisterdServices,deleteRegisterdService } from '../redux/actions/registed_service';
import PropTypes from 'prop-types';



ServiceRegistration_RegisteredServices.propTypes = {
    companyId: PropTypes.any
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
        console.log("=================",data)
        console.log("use effect 2");
    }, [data])

    const cancelRegisteredService = (registerdServiceId) => {
        if(registerdServiceId){
            dispatch(deleteRegisterdService(registerdServiceId));
            window.location.reload();
        }
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
                            Các dịch vụ mà công ty <span style={{color: "red",fontSize:"30px"}}>{company?.name}</span> đã đăng ký:
                            <br/>
                            
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
                                            <td>{item?.service?.name}</td>
                                            <td>{item?.startDate}</td>
                                            <td>{item?.currentPrice}</td>
                                            <td>{item?.description}</td>
                                            <td>
                                                { item?.service?.required === 0 ?
                                                <button onClick={() => cancelRegisteredService(item?.id)} className="post-delete-btn">
                                                    <i className='bx bxs-pencil'>Cancel</i>
                                                </button>
                                                :
                                                <button className="post-disabled-btn">
                                                    <i className='bx bxs-pencil'>Cancel</i>
                                                </button>
                                                }
                                            </td>        
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        <i style={{fontSize:"15px"}}>(Chú ý: giá hiện tại mỗi tháng của mỗi dịch vụ được tính bằng công thức: công ty dưới 10 người và thuê dưới 100 m2 thì có cùng mức giá dịch vụ cho mỗi dịch vụ
                                , cứ thêm 5 người hoặc thêm 10 m2 diện tích sàn thì đơn giá tăng lên 5% cho mỗi mục))</i>            
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ServiceRegistration_RegisteredServices;

