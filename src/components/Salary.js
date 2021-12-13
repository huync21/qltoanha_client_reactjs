import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSalary, getSalaryByService, deleteSalary, updateSalary, saveServiceToRedux } from '../redux/actions/salary';
import {getServiceById} from '../redux/actions/service';

const Salary = () => {
    const data = useSelector(state => state.salary.data)
    const [salaries, setSalaries] = useState(data);
    // biến để show pop up sửa thông tin
    const [isShow, setIsShow] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const search = useLocation().search;
    const serviceId = new URLSearchParams(search).get('serviceId');
    const [editIndex, setEditIndex] = useState("");
    const [isSalaryLevel, setIsSalaryLevel] = useState(true);
    const [isSalary, setIsSalary] = useState(true);
    const [iconLoad, setIconLoad] = useState(false);

    // Lấy dữ liệu dich vu
    const dataService = useSelector(state => state.service.service);
    const [service, setService] = useState(dataService);

    useEffect(() => {
        // dispatch(getAllRegisterdServices(companyId));
        // dispatch(getCompanyById(companyId))
        dispatch(getSalaryByService(serviceId));
        dispatch(getServiceById(serviceId));
        console.log('Service extracted: ',service);
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setSalaries(data);
    }, [data])

    useEffect(() => {
        setService(dataService);
    }, [dataService])

    // Gọi api hủy dịch vụ
    const deleteClick = (id) => {
        if (id) {
            // dispatch(deleteRegisterdService(registerdServiceId));
            dispatch(deleteSalary(id));
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getSalaryByService(serviceId))
                setIconLoad(false)
                cancelClick();
            }, 300)
        }
    }

    // Mở pop up edit item
    const popUpEditForm = (index) => {
        setEditIndex(index);
        document.getElementById('salary-level').value = salaries[index].salaryLevel;
        document.getElementById('salary').value = salaries[index].salary;
        setIsShow(true)
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpAddForm = () => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
    }

    // Tắt pop up
    const cancelClick = () => {
        setIsShow(false)
    }

    const addOrEdit = () => {
        if(isAdd) {
            addSalary();
        }else{
            editSalary();
        }
    }

    const editSalary = () => {
        const salaryLevel = document.getElementById('salary-level').value;
        const salary = document.getElementById('salary').value;
        const data = {
            salary: Number(salary),
            salaryLevel: Number(salaryLevel),
            service:service
        }
        dispatch(updateSalary(salaries[editIndex].id, data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getSalaryByService(serviceId))
                setIconLoad(false)
                cancelClick();
            }, 300)
    }

    const addSalary = () => {
        const salaryLevel = document.getElementById('salary-level').value;
        const salary = document.getElementById('salary').value;
        const checkSalaryLevel = validateSalaryLevel(salaryLevel);
        console.log(checkSalaryLevel);
        setIsSalaryLevel(checkSalaryLevel);
        const checkSalary = validateSalary(salary);
        setIsSalary(checkSalary);
        if(!(checkSalaryLevel&&checkSalary))
            return;
        const data = {
            salary: Number(salary),
            salaryLevel: Number(salaryLevel),
        }
        dispatch(createNewSalary(serviceId, data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getSalaryByService(serviceId))
                setIconLoad(false)
                cancelClick();
            }, 300)
    }

    const validateSalaryLevel = (sl) => {
        if(!isNaN(sl) && sl >0)
            return true;
        else
            return false;
    }

    const validateSalary = (s) => {
        if(!isNaN(s) && s >0)
            return true;
        else
            return false;
    }

    return(
        <>
            <div style={{ position: 'relative' }}>
                <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
                </div>
                <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                            Chỉnh sửa mức lương
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <input style={{width: '100%'}} type="text" id='salary-level' placeholder = "Mức lương"/>
                                    <span style={{display: isSalaryLevel ? "none" : ""}} className='validate-phone'>Mức lương phải là số lớn hơn 0</span>
                                </div>
                                <div className="form-post__field">
                                    <input style={{width: '100%'}} type="text" id='salary' placeholder = "Lương"/>
                                    <span style={{display: isSalary ? "none" : ""}} className='validate-phone'>Lương phải là số lớn hơn 0</span>
                                </div>
                            </div>
                            <div className="form-post__control">
                                <button onClick={() => cancelClick()} className="cancel-btn">
                                    Hủy
                                </button>
                                <button className="add-section-btn" onClick={() => addOrEdit()}>
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
                                Các mức lương của dịch vụ: <span style={{ color: "red", fontSize: "20px" }}>{service?.name}</span>
                                <br />
                            </div>
                            <div style={{right: '10px'}} className="admin-post__button">
                                <button onClick={() => popUpAddForm()}>
                                    Thêm mức lương mới
                                </button>
                            </div>
                        </div>
                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Mức lương</th>
                                        <th style={{ width: '200px' }}>Lương</th>
                                        <th style={{ width: '200px' }}>Sửa mức lương</th>
                                        <th style={{ width: '200px' }}>Xóa mức lương</th>
                                    </tr>
                                    {
                                        salaries?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.salaryLevel}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item?.salary)}</td>
                                                <td>
                                                    <button onClick={() => popUpEditForm(index)} className="post-edit-item-btn">
                                                        <i className='bx bxs-pencil'></i>
                                                        SỬA
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteClick(item.id)} className="post-delete-btn">
                                                        <i className='bx bx-trash'></i>XÓA
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

export default Salary;
