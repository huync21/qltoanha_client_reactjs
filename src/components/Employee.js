import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { getCompaniesForRegistrationByName, saveCompanyToRedux,getAllCompanyForRegistration} from '../redux/actions/registed_service';
import { Link } from 'react-router-dom';
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany, createNewCompany, updateCompany, deleteCompany } from '../redux/actions/company';
import { createEmployee, deleteEmployee, getAllEmployeeBy, updateEmployee } from '../redux/actions/empoyee';

const Employee = () => {
    const [isShow, setIsShow] = useState(false)
    const data = useSelector(state => state.employee.data)
    const [employees, setEmployees] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditEmployee, setIndexEditEmployee] = useState(null);
    const [companyId, setCompanyId] = useState(0);
    const [nameSearch, setNameSearch] = useState("");
    const [isPhone, setIsPhone] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        const id = location.pathname.split('/')[3];
        setCompanyId(Number(id))
        dispatch(getAllEmployeeBy(Number(id)));
        return () => {
            console.log(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setEmployees(data);
    }, [data])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditEmployee(index);
        document.getElementById('name').value = employees[index].name;
        document.getElementById('date').value = employees[index].dateOfBirth;
        document.getElementById('socialId').value = employees[index].socialId;
        document.getElementById('phone-no').value = employees[index].phoneNo;
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            document.querySelector('.dialog__title').textContent = "S???a th??ng tin c??ng ty";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Th??m m???i c??ng ty";
        }
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    }

    const addOrUpdateItem = () => {
        setIsPhone(true);
        if (isAdd) {
            addItem();
        }
        else {
            editEmployee();
        }

    }

    const editEmployee = () => {
        const name = document.getElementById('name').value;
        const dateOfBirth = document.getElementById('date').value;
        const socialId = document.getElementById('socialId').value;
        const phoneNo = document.getElementById('phone-no').value;
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if(!validate)
            return;


        const data = {
            name: name,
            dateOfBirth: new Date(dateOfBirth),
            socialId: socialId,
            phoneNo: phoneNo,
            company: employees[indexEditEmployee].company
        }
        
        dispatch(updateEmployee(employees[indexEditEmployee].id, data));
        let tmpEmployees = employees;
        tmpEmployees.name = name;
        tmpEmployees.dateOfBirth = new Date(dateOfBirth);
        tmpEmployees.socialId = socialId;
        tmpEmployees.phoneNo = phoneNo;
        tmpEmployees.company = employees[indexEditEmployee].company;
        setEmployees(tmpEmployees);
        cancelClick();
    }

    const removeEmployee = (id) => {
        if (id) {
            dispatch(deleteEmployee(id));
            const tmpEmployees = employees.filter(emp => emp.id != id);
            setEmployees(tmpEmployees);
        }
    }

    const validatePhone = (phoneNumber) => {
        var regPhone = /^\d{10}$/;
        return phoneNumber.match(regPhone);
    }

    const addItem = () => {
        const name = document.getElementById('name').value;
        const dateOfBirth = document.getElementById('date').value;
        const socialId = document.getElementById('socialId').value;
        const phoneNo = document.getElementById('phone-no').value;
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if(!validate)
            return;

        const data = {
            name: name,
            dateOfBirth: new Date(dateOfBirth),
            socialId: socialId,
            phoneNo: phoneNo
        }

        dispatch(createEmployee(data, companyId));
        window.location.reload();
        cancelClick();
    }

    const searchEmployee = () => {
        if(nameSearch.trim().length == 0)
            return;
        const tmpEmployees = employees.filter(emp => emp.name.includes(nameSearch.trim()));
        setEmployees(tmpEmployees);
    }


    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay"></div>
                <div className="form-post">
                    <div className="form-post__title dialog__title">
                        Th??m m???i nh??n vi??n
                    </div>
                    <div className="form-post__content">
                        <div className="form-post__wrapper">
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='name' placeholder="Name" />
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='date' placeholder="date of birth: mm/dd/yyyy" />
                                <span style={{display: "none"}}>Vui l??ng nh???p ????ng ?????nh d???ng</span>
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='socialId' placeholder="social id"/>
                            </div>
                            <div className="form-post__field">
                                <input style={{ width: '100%' }} type="text" id='phone-no' placeholder="Phone No" />
                                <span style={{display: isPhone ? "none" : ""}} className='validate-phone'>Sai ?????nh d???ng s??? ??i???n tho???i</span>
                            </div>
                        </div>
                        <div className="form-post__control">
                            <button onClick={() => cancelClick()} className="cancel-btn">
                                H???y
                            </button>
                            <button className="add-section-btn" onClick={() => addOrUpdateItem()}>
                                <i className='bx bx-save'></i>
                                L??u
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                <div className="admin-post__wrapper">
                    <div className="admin-post__head">
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                            Danh s??ch nh??n vi??n
                        </div>
                        <form action="javascript:" class="search-bar">
                            <input placeholder='T??m ki???m nh??n vi??n theo t??n' type="search" name="search" pattern=".*\S.*" required onChange={(e) => setNameSearch(e.target.value)}/>
                            <button onClick={() => searchEmployee()} class="search-btn" type="submit">
                                <span>Search</span>
                            </button>
                        </form> 
                        <div style={{ right: '10px' }} className="admin-post__button">
                            <button onClick={() => popUpActive()}>
                                Th??m nh??n vi??n
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{ width: '200px' }}>T??n</th>
                                    <th style={{ width: '200px' }}>M?? nh??n vi??n</th>
                                    <th style={{ width: '200px' }}>S??? ??i???n tho???i</th>
                                    <th style={{ width: '200px' }}>Ng??y sinh</th>
                                    <th style={{ width: '105px' }}>S???a</th>
                                    <th style={{ width: '105px' }} >X??a</th>
                                </tr>
                                {
                                    employees?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.socialId}</td>
                                            <td>{item?.phoneNo}</td>
                                            <td>{item?.dateOfBirth?.split("T")[0]}</td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    S???a
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeEmployee(item.id)}>
                                                    <i className='bx bx-trash'></i>
                                                    X??a
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
};

export default Employee;