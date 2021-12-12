import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService, createNewService, updateService, deleteService, getServiceByName } from '../redux/actions/service';
import {saveServiceToRedux} from '../redux/actions/salary'
import { Link } from 'react-router-dom';
const Service = () =>{
    const [isShow, setIsShow] = useState(false);
    const data = useSelector(state => state.service.data);
    const [services, setServices] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditService, setIndexEditService] = useState(null);
    const [name, setName] = useState(null);

    const [isPrice, setIsPrice] = useState(true);
    const [isMandatory, setIsMandatory] = useState(true);
    const [iconLoad, setIconLoad] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllService());
        return () => {
            console.log(location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setServices(data);
    }, [data])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditService(index);
        document.getElementById('is-required').value = services[index].required;
        document.getElementById('name').value = services[index].name;
        document.getElementById('price').value = services[index].price;
        document.getElementById('type').value = services[index].type;
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if(mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa thông tin dịch vụ";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm mới dịch vụ";
        }
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.getElementById('is-required').value = "";
        document.getElementById('name').value = "";
        document.getElementById('price').value = "";
        document.getElementById('type').value = "";
        document.querySelector('.form-post').classList.remove('active');
    }

    const addOrUpdateItem = () => {
        if(isAdd){
            addService();
        }
        else{
            editService();
        }
    }

    const editService = () => {
        const name = document.getElementById('name').value;
        const isRequired = document.getElementById('is-required').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;
        
        const validateIsRequired = validateMandatory(isRequired);
        setIsMandatory(validateIsRequired);
        const validateIsPrice = validatePrice(price);
        setIsPrice(validateIsPrice);
        console.log(validateIsPrice,validateIsRequired);
        if(! (validateIsPrice&&validateIsRequired))
            return;
        
        const data = {
            name: name,
            required: isRequired,
            price: Number(price),
            type: type
        }
        dispatch(updateService(services[indexEditService].id, data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        cancelClick();
    }

    const removeService = (id) => {
        if(id){
            dispatch(deleteService(id));
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        }
    }

    const addService = () => {
        const name = document.getElementById('name').value;
        const isRequired = document.getElementById('is-required').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;
        
        const validateIsRequired = validateMandatory(isRequired);
        setIsMandatory(validateIsRequired);
        const validateIsPrice = validatePrice(price);
        setIsPrice(validateIsPrice);
        console.log(validateIsPrice,validateIsRequired);
        if(! (validateIsPrice&&validateIsRequired))
            return;

        const data = {
            name: name,
            required: Number(isRequired),
            price: Number(price),
            type: type
        }

        dispatch(createNewService(data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllService())
                setIconLoad(false)
            }, 300)
        cancelClick();
    }

    const viewSalary = (service) => {
        dispatch(saveServiceToRedux(service));
    }
    
    const onNameChange = (e) => {
        setName(e.target.value);
        console.log('name changed', name);
    }

    const searchServiceByName = () => {
        console.log('dispatching ',name);
        dispatch(getServiceByName(name));
    }

    const validateMandatory = (mandatory) => {
        return (mandatory==1||mandatory==0);
    }

    const validatePrice = (price) => {
        if(!isNaN(price) && price >0)
            return true;
        else
            return false;
    }

    return(
        <div style={{position: 'relative'}}>
            <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
            </div>
            <div style={{display: isShow ? 'block' : 'none'}} className="modal">
            <div className="form-post">
                <div className="form-post__title dialog__title">
                    {/* Thêm mới dịch vụ */}
                </div>
                <div className="form-post__content">
                    <div className="form-post__wrapper">
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='name' placeholder = "Tên dịch vụ"/>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='is-required' placeholder = "Dịch vụ bắt buộc? (1 nếu có, 0 nếu ngược lại)"/>
                            <span style={{display: isMandatory ? "none" : ""}} className='validate-phone'>Nhập 1 hoặc 0</span>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='price' placeholder = "Giá"/>
                            <span style={{display: isPrice ? "none" : ""}} className='validate-phone'>Nhập lượng giá phù hợp</span>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='type' placeholder = "Loại dịch vụ"/>
                        </div>
                    </div>
                    <div className="form-post__control">
                        <button onClick={() => cancelClick() } className="cancel-btn">
                            Hủy
                        </button>
                        <button className="add-section-btn" onClick={() => addOrUpdateItem()}>
                            <i className='bx bx-save'></i>
                            Lưu
                        </button>
                    </div>
                </div>  
            </div>
            </div>
            <div style={{maxWidth: "1100px", minHeight: "100vh"}} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    Tìm kiếm dịch vụ:
                                    <br />
                            </div>                            
                            <form action="javascript:" class="search-bar">
                                <input value={name} onChange={(e) => {onNameChange(e)}}type="search" name="search" pattern=".*\S.*" required />
                                <button onClick={() => searchServiceByName()} class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>                            
                            <div style={{ right: '10px' }} className="admin-post__button">
                                <button onClick={() => popUpActive()}>
                                    Thêm dịch vụ mới
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Thông tin các dịch vụ
                                <br />
                        </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{width: '200px'}}>Tên dịch vụ</th>
                                    <th style={{width: '200px'}}>Dịch vụ bắt buộc?</th>
                                    <th style={{width: '200px'}}>Giá</th>
                                    <th style={{width: '200px'}}>Loại dịch vụ</th>
                                    {/* <th style={{width: '200px'}} >Employees</th>
                                    <th style={{width: '105px'}}>View Employee</th> */}
                                    <th style={{width: '105px'}}>Xem mức lương</th>
                                    <th style={{width: '105px'}}>Sửa</th>
                                    <th style={{width: '105px'}} >Xóa</th>
                                </tr>
                                {
                                    services?.map((item, index) => (
                                        <tr key = {index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.required===1 ? "Có": "Không"}</td>
                                            <td>{item.price}</td>
                                            <td>{item.type}</td>
                                            {/* <td>{item?.numberOfEmployee}</td> */}
                                            {/* <td>
                                                <button onClick={() => viewEmployee(item.id)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    View
                                                </button>
                                            </td> */}
                                            <td>
                                                    <Link to={{
                                                        pathname: "/salary",
                                                        search: `?serviceId=` + item?.id,
                                                    }}>
                                                        <button onClick={() => viewSalary(item)} className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            Xem
                                                        </button>
                                                    </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeService(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    Xóa
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
    )
}

export default Service;