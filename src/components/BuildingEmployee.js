// Fix dob not showing up on Edit form
// Add salary update for employee
// useDispatch instead of windows.reload
import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PopUpSalaryTable from './PopUpSalaryTable';
import {getSalaryById, getAllSalary} from '../redux/actions/salary';
import {createNewBuildingEmployee, deleteBuildingEmployee, getAllBuildingEmployees, getBuildingEmployeeById, updateBuildingEmployee} from '../redux/actions/building_employee';

const BuildingEmployee = () => {
    const salaryData = useSelector(state => state.salary.salary)
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

    useEffect(() => {
        dispatch(getAllBuildingEmployees());
        // console.log('dispatched');
        return () => {
        }
    }, [location.pathname])

    useEffect(() => {
        setBuildingEmployees(data);
        console.log('setBE',data);
    }, [data])

    // useEffect(() => {
    //     setService(dataService);
    // }, [dataService])

    const onDobChange = (e) => {
        setDob(e.target.value);
    }

    const deleteClick = (id) => {
        if (id) {
            // dispatch(deleteRegisterdService(registerdServiceId));
            dispatch(deleteBuildingEmployee(id));
            window.location.reload();
        }
    }

    // Mở pop up edit item
    const popUpEditForm = (index) => {
        setEditIndex(index);
        document.getElementById('name').value = buildingEmployees[index].name;
        document.getElementById('address').value = buildingEmployees[index].address;
        document.getElementById('dob').value = buildingEmployees[index].dateOfBirth;
        document.getElementById('phone-no').value = buildingEmployees[index].phoneNo;
        document.getElementById('position').value = buildingEmployees[index].position;
        document.getElementById('salary-id').value = buildingEmployees[index].salary.id;
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
        setIsAdd(false)
    }

    const addOrEdit = () => {
        if(isAdd) {
            addBuildingEmployee();
        }else{
            editBuildingEmployee();
        }
        cancelClick();
        window.location.reload();
    }

    const editBuildingEmployee = () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        // const dob = moment(document.getElementById('dob').value).format("YYYY-MM-DD");
        const phoneNo = document.getElementById('phone-no').value;
        const position = document.getElementById('position').value;
        dispatch(getSalaryById(document.getElementById('salary-id').value));
        setSalary(salaryData);
        const data = {
            address: address,
            name: name,
            dateOfBirth: dob,
            phoneNo: phoneNo,
            position: position,
            salary: salary,
        }
        dispatch(updateBuildingEmployee(buildingEmployees[editIndex].id, data));
    }

    const addBuildingEmployee = () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        // const dob = document.getElementById('dob').value;
        const phoneNo = document.getElementById('phone-no').value;
        const position = document.getElementById('position').value;
        const salaryId = document.getElementById('salary-id').value;
        const data = {
            address: address,
            name: name,
            dateOfBirth: moment(dob).format("YYYY-MM-DD"),
            phoneNo: phoneNo,
            position: position,
        }
        dispatch(createNewBuildingEmployee(salaryId, data));
    }

    const chooseSalary = () => {
        setShowSalaryPopUp(true);
        dispatch(getAllSalary());
        setSalaries(salariesData);
        console.log(salaries);
    }


    return(
        <>
            <div style={{ position: 'relative' }}>
                <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                            Chỉnh sửa nhân viên
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>Tên</strong></p>
                                    <input style={{width: '100%'}} type="text" id='name'/>
                                </div>
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>Địa chỉ</strong></p>
                                    <input style={{width: '100%'}} type="text" id='address' />
                                </div>
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>Ngày sinh</strong></p>
                                    <input style={{width: '100%'}} onChange={(e) => { onDobChange(e) }} type="date" id='dob'/>
                                </div>
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>SĐT</strong></p>
                                    <input style={{width: '100%'}} type="text" id='phone-no'/>
                                </div>
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>Vị trí</strong></p>
                                    <input style={{width: '100%'}} type="text" id='position' />
                                </div>
                                <div className="form-post__field">
                                    <p style ={{textAlign: "left"}}><strong>ID mức lương</strong></p>
                                    <div style ={{display: 'flex'}}>
                                        <input className = "salary-field" style={{width: '100%'}} type="text" id='salary-id' readonly value=""/>
                                        <button onClick={() => chooseSalary()} style={{background: 'yellow', height: '40px', width: '150px', border: 'none', borderRadius: '5px', marginLeft: '5px', hover: 'pointer'}}>Chọn mức lương</button>
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
                <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                    <div className="admin-post__wrapper">
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Thông tin nhân viên tòa nhà
                                <br />
                            </div>
                            <div style={{right: '10px'}} className="admin-post__button">
                            <button onClick={() => popUpAddForm()}>
                                Thêm nhân viên mới
                            </button>
                        </div>
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
            {<PopUpSalaryTable/>}
        </>
    )

}



export default BuildingEmployee;