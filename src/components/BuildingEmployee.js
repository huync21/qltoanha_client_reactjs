
// Fix dob not showing up on Edit form
// Add salary update for employee
// useDispatch instead of windows.reload
import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getSalaryById, getAllSalary } from '../redux/actions/salary';
import { createNewBuildingEmployee, deleteBuildingEmployee, getAllBuildingEmployees, getBuildingEmployeeById, updateBuildingEmployee, getBuildingEmployeeByName } from '../redux/actions/building_employee';

const BuildingEmployee = () => {
    const salaryData = useSelector(state => state.salary.salary);
    const [salary, setSalary] = useState(salaryData);
    const data = useSelector(state => state.buildingEmployee.data);
    const [buildingEmployees, setBuildingEmployees] = useState(data);
    const [dob, setDob] = useState(null);
    const salariesData = useSelector(state => state.salary.data);
    const [salaries, setSalaries] = useState(salariesData);
    // biến để show pop up sửa thông tin
    const [isShow, setIsShow] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState("");
    const [showSalaryPopUp, setShowSalaryPopUp] = useState(false);
    const [iconLoad, setIconLoad] = useState(false);

    const [name, setName] = useState(null);
    const [isPhone, setIsPhone] = useState(true);

    useEffect(() => {
        dispatch(getAllBuildingEmployees());
        // console.log('dispatched');
        return () => {
        }
    }, [location.pathname])

    useEffect(() => {
        setBuildingEmployees(data);
    }, [data])

    useEffect(() => {
        setSalaries(salariesData);
    }, [salariesData])

    useEffect(() => {
        setSalary(salaryData);
        setTimeout(() => {console.log('salary updated: ',salary)}, 600);
    }, [salaryData])

    const onDobChange = (e) => {
        setDob(e.target.value);
        console.log(dob);
    }

    const deleteClick = (id) => {
        if (id) {
            // dispatch(deleteRegisterdService(registerdServiceId));
            dispatch(deleteBuildingEmployee(id));
            setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllBuildingEmployees())
                setIconLoad(false)
            }, 300)

        }
    }

    // Mở pop up edit item
    const popUpEditForm = (index) => {
        setEditIndex(index);
        document.getElementById('name').value = buildingEmployees[index].name;
        document.getElementById('address').value = buildingEmployees[index].address;
        // setDob(moment(buildingEmployees[index].dateOfBirth).format("YYYY-MM-DD"));
        document.getElementById('dob').value = moment(buildingEmployees[index].dateOfBirth, "DD-MM-YYYY", true).format("YYYY-MM-DD");
        // document.getElementById('dob').value = buildingEmployees[index].dateOfBirth;
        document.getElementById('phone-no').value = buildingEmployees[index].phoneNo;
        document.getElementById('position').value = buildingEmployees[index].position;
        document.querySelector('.salary__id').textContent = buildingEmployees[index].salary.id;
        // document.querySelector('salary__id').textContent = "2";
        setIsShow(true)
        document.querySelector('.dialog__title').textContent = "Chỉnh sửa nhân viên";
        document.querySelector('.form-post').classList.add('active');
        
    }

    const popUpAddForm = () => {
        setIsShow(true);
        setIsAdd(true);
        setIsPhone(true);
        document.querySelector('.dialog__title').textContent = "Thêm mới nhân viên";
        document.querySelector('.form-post').classList.add('active');
        document.getElementById('name').value = ""
        document.getElementById('address').value = ""
        document.getElementById('dob').value = ""
        document.getElementById('phone-no').value = ""
        document.getElementById('position').value = ""
        document.getElementById('salary-id').textContent = ""
        
    }

    // Tắt pop up
    const cancelClick = () => {
        setIsShow(false)
        setIsAdd(false)
        document.getElementById('name').value = ""
        document.getElementById('address').value = ""
        document.getElementById('dob').value = ""
        document.getElementById('phone-no').value = ""
        document.getElementById('position').value = ""
        document.getElementById('salary-id').value = ""
    }

    const addOrEdit = () => {
        if (isAdd) {
            addBuildingEmployee();
        } else {
            editBuildingEmployee();
        }
    }

    const editBuildingEmployee = () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const dob1 = document.getElementById('dob').value;
        // console.log("ngay sinh 1",dob1)
        const phoneNo = document.getElementById('phone-no').value;
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if(!validate)
            return;
        const position = document.getElementById('position').value;
        const salaryId = document.getElementById('salary-id').textContent;
        // console.log('about to run', salaryId);
        // setTimeout(() => {setSalary(salaryData); console.log('salary updated: ',salary)}, 600);
        const data1 = {
            address: address,
            name: name,
            dateOfBirth: moment(dob1).format("YYYY-MM-DD"),
            phoneNo: phoneNo,
            position: position,
        }
    
        // console.log("data:-======= ",data1)
        dispatch(updateBuildingEmployee(buildingEmployees[editIndex].id,salaryId, data1));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllBuildingEmployees())
                setIconLoad(false)
                cancelClick();
            }, 300)
    }

    const addBuildingEmployee = () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        // const dob = document.getElementById('dob').value;
        const phoneNo = document.getElementById('phone-no').value;
        const validate = validatePhone(phoneNo);
        setIsPhone(validate);
        if(!validate)
            return;
        
        const position = document.getElementById('position').value;
        const salaryId = document.getElementById('salary-id').textContent;
        console.log('salaryID=',salaryId);
        const data = {
            address: address,
            name: name,
            dateOfBirth: moment(dob).format("YYYY-MM-DD"),
            phoneNo: phoneNo,
            position: position,
        }
        dispatch(createNewBuildingEmployee(salaryId, data));
        setIconLoad(true)
            setTimeout(() => {
                dispatch(getAllBuildingEmployees())
                setIconLoad(false)
                cancelClick();
            }, 300)
    }

    const chooseSalary = () => {
        setShowSalaryPopUp(true);
        dispatch(getAllSalary());
        setTimeout(() => {console.log("this was ran: ",salariesData);},800);
    }

    const salaryChosen = (item) => {
        setShowSalaryPopUp(false);
        document.querySelector('.salary__id').textContent = item.id;

    }

    const onNameChange = (e) => {
        setName(e.target.value);
        console.log(name);
    }

    const searchBuildingEmployeeByName = () => {
        dispatch(getBuildingEmployeeByName(name));
    }

    const validatePhone = (phoneNumber) => {
        var regPhone = /^\d{10}$/;
        return phoneNumber.match(regPhone);
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
                </div>
                <div style={{ display: isShow&&!showSalaryPopUp ? 'block' : 'none'}} className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Tên</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='name' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Địa chỉ</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='address' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Ngày sinh</strong></p>
                                    <input style={{ width: '100%' }} onChange={(e) => { onDobChange(e) }} type="date" id='dob' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>SĐT</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='phone-no' />
                                    <span style={{display: isPhone ? "none" : ""}} className='validate-phone'>SĐT phải bao gồm 10 chữ số</span>
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Vị trí</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='position' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>ID mức lương</strong></p>
                                    <div style={{display: 'flex'}}>
                                        <div className = "salary__id" id="salary-id" style={{display: 'block', width: '100%', textAlign:'left',border:'1px solid #bbbbbb',borderRadius:'5px', textIndent:"10px"}}/>
                                        <button onClick={() => chooseSalary()} style={{height: '38px', width: '100px', marginLeft: '10px', color: 'white', background: 'orange', border: 'none', borderRadius: '5px', cursor: 'pointer'}}><b>Thay đổi</b></button>
                                    </div>
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
                <div style={{ display: showSalaryPopUp ? 'block' : 'none'}} className='modal'>
                    <div className='modal_overlay'></div>
                    <div className='form-post active'>
                        <div className='form-post__title'> Danh sách mức lương</div>
                        <div className="form-post__content">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Mức lương</th>
                                        <th style={{ width: '200px' }}>Lương</th>
                                        <th style={{ width: '200px' }}>Tên dịch vụ</th>
                                        <th style={{ width: '200px' }}></th>
                                    </tr>
                                    {
                                        salaries?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.salaryLevel}</td>
                                                <td>{item?.salary}</td>
                                                <td>{item?.service.name}</td>
                                                <td><button onClick={() => {salaryChosen(item)}} style={{height: '38px', width: '100px', marginLeft: '10px', color: 'white', background: 'orange', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Chọn</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="form-post__control">
                                <button onClick={() => {setShowSalaryPopUp(false);}} className="cancel-btn">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                    <div className="admin-post__wrapper">
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    Tìm kiếm nhân viên:
                                    <br />
                            </div>                            
                            <form action="javascript:" class="search-bar">
                                <input value={name} onChange={(e) => {onNameChange(e)}}type="search" name="search" pattern=".*\S.*" required />
                                <button onClick={() => searchBuildingEmployeeByName()} class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>                            
                            <div style={{ right: '10px' }} className="admin-post__button">
                                <button onClick={() => popUpAddForm()}>
                                    Thêm nhân viên mới
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Thông tin nhân viên tòa nhà
                                <br />
                        </div>
                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên</th>
                                        <th style={{ width: '200px' }}>Ngày sinh</th>
                                        <th style={{ width: '200px' }}>Địa chỉ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }}>Vị trí</th>
                                        <th style={{ width: '200px' }}>ID mức lương</th>
                                        <th style={{ width: '200px' }}>Cập nhật nhân viên</th>
                                        <th style={{ width: '200px' }}>Xóa nhân viên</th>
                                    </tr>
                                    {
                                        buildingEmployees?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.dateOfBirth}</td>
                                                <td>{item?.address}</td>
                                                <td>{item?.phoneNo}</td>
                                                <td>{item?.position}</td>
                                                <td>{item?.salary.id}</td>
                                                <td>
                                                    <button onClick={() => popUpEditForm(index)} className="post-edit-item-btn">
                                                        <i className='bx bxs-pencil'></i>
                                                        Sửa
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteClick(item.id)} className="post-delete-btn">
                                                        <i className='bx bx-trash'></i>Xóa
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



export default BuildingEmployee;