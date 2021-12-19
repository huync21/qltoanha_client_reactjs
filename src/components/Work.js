import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import '../css/search_bar.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {getAllWork, getWorkByEmpId, getWorkByTitleAndEmpId, getWorkById, getWorkByTitle, createNewWork, updateWork, deleteWork} from '../redux/actions/work.js';
import { getAllBuildingEmployees } from '../redux/actions/building_employee';

const Work = () => {
    const empData = useSelector(state => state.buildingEmployee.data);
    const [emp, setEmp] = useState(empData);
    const data = useSelector(state => state.work.data);
    const [workList, setWorkList] = useState(data);

    const [isShow, setIsShow] = useState(false);
    const [isAdd, setIsAdd] = useState(null);
    const [showEmpPopUp, setShowEmpPopUp] = useState(false);
    const [iconLoad, setIconLoad] = useState(false);

    const [editIndex, setEditIndex] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(getAllWork());
        dispatch(getAllBuildingEmployees());
        return () => {

        }
    }, [location.pathname])

    useEffect(() => {
        setWorkList(data);
    },[data])

    useEffect(() => {
        setEmp(empData);
    },[empData])


    const popUpAddForm = () => {
        setIsAdd(true);
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        document.getElementById('title').value = "";
        document.getElementById('detail').value = "";
        document.getElementById('start-date').value = "";
        document.getElementById('due-date').value = "";
        document.getElementById('assigner').value = "";
        document.querySelector('.emp-id').textContent="";
    }

    const popUpEditForm = (index) => {
        setIsAdd(false);
        setIsShow(true);
        setEditIndex(workList[index].id);
        document.querySelector('.form-post').classList.add('active');
        document.getElementById('title').value = workList[index].title;
        document.getElementById('detail').value = workList[index].detail;
        document.getElementById('start-date').value = moment(workList[index].startDate, "DD-MM-YYYY", true).format("YYYY-MM-DD");
        document.getElementById('due-date').value = moment(workList[index].dueDate, "DD-MM-YYYY", true).format("YYYY-MM-DD");
        document.getElementById('assigner').value = workList[index].assigner;
        document.querySelector('.emp-id').textContent=workList[index].buildingEmployee.id + " - " + workList[index].buildingEmployee.name;
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        setShowEmpPopUp(false);
    }

    const addOrEdit = () => {
        const title=document.getElementById('title').value;
        const detail=document.getElementById('detail').value;
        const sd=document.getElementById('start-date').value;
        const dd=document.getElementById('due-date').value;
        const assigner=document.getElementById('assigner').value;
        const emp_id=document.querySelector('.emp-id').textContent.match(/\d+/)[0];

        const data = {
            title: title,
            detail: detail,
            startDate: moment(sd).format('YYYY-MM-DD'),
            dueDate: moment(dd).format('YYYY-MM-DD'),
            assigner: assigner,
        }
        if(isAdd)
            dispatch(createNewWork(emp_id, data))
        else
            dispatch(updateWork(editIndex,emp_id,data));

        setIconLoad(true)
        setTimeout(() => {
            dispatch(getAllWork())
            setIconLoad(false)
            cancelClick();
        }, 300)
    }

    const deleteClick = (id) => {
        dispatch(deleteWork(id));
        setIconLoad(true)
        setTimeout(() => {
            dispatch(getAllWork())
            setIconLoad(false)
            cancelClick();
        }, 300)
    }

    const chooseEmp = () => {
        setShowEmpPopUp(true);
    }

    const empChosen = (item) =>{
        setShowEmpPopUp(false);
        document.querySelector('.emp-id').textContent = item.id + " - " + item.name;
    }

    const onEmpFilterChange = (e) => {
        const emp_id=e.target.value;
        if(emp_id>0){
            dispatch(getWorkByEmpId(emp_id));
        }
        else
            dispatch(getAllWork());
        
    }

    const searchWorkByTitleAndEmp = () => {
        const emp_id = document.getElementById('emp-list').value;
        const search_title = document.getElementById('title-search').value;
        if(emp_id > 0){
            dispatch(getWorkByTitleAndEmpId(emp_id,search_title));
        }
        else{
            dispatch(getWorkByTitle(search_title));
        }
        
    }

    return(
        <>
            <div style={{ position: 'relative' }}>
                <div class="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                    <div class="loader"></div>
                </div>
                <div style={{ display: isShow&&!showEmpPopUp ? 'block' : 'none'}} className="modal">
                    <div className="modal_overlay"></div>
                    <div className="form-post">
                        <div className="form-post__title dialog__title">
                        </div>
                        <div className="form-post__content">
                            <div className="form-post__wrapper">
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Tiêu đề</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='title' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Nội dung</strong></p>
                                    <textarea style={{ width: '100%' }} id='detail' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Ngày bắt đầu</strong></p>
                                    <input style={{ width: '100%' }} type="date" id='start-date' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Ngày kết thúc</strong></p>
                                    <input style={{ width: '100%' }} type="date" id='due-date' />
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Người giao việc</strong></p>
                                    <input style={{ width: '100%' }} type="text" id='assigner' />
                                    {/* <span style={{display: isPhone ? "none" : ""}} className='validate-phone'>SĐT phải bao gồm 10 chữ số</span> */}
                                </div>
                                <div className="form-post__field">
                                    <p style={{ textAlign: "left" }}><strong>Người nhận việc</strong></p>
                                    <div style={{display: 'flex'}}>
                                        <div className = "emp-id" id="emp-id" style={{display: 'block', width: '100%', textAlign:'left',border:'1px solid #bbbbbb',borderRadius:'5px', textIndent:"10px"}}/>
                                        <button onClick={() => chooseEmp()} style={{height: '38px', width: '100px', marginLeft: '10px', color: 'white', background: 'orange', border: 'none', borderRadius: '5px', cursor: 'pointer'}}><b>Chọn</b></button>
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
                <div style={{ display: showEmpPopUp ? 'block' : 'none'}} className='modal'>
                    <div className='modal_overlay'></div>
                    <div className='form-post active' style={{maxWidth:'900px'}}>
                        <div className='form-post__title'> Danh sách nhân viên</div>
                        <div className="form-post__content">
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
                                    </tr>
                                    {
                                        emp?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.dateOfBirth}</td>
                                                <td>{item?.address}</td>
                                                <td>{item?.phoneNo}</td>
                                                <td>{item?.position}</td>
                                                <td>{item?.salary.id}</td>
                                                <td><button onClick={() => {empChosen(item)}} style={{height: '38px', width: '100px', marginLeft: '10px', color: 'white', background: 'orange', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Chọn</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="form-post__control">
                                <button onClick={() => {setShowEmpPopUp(false);}} className="cancel-btn">
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
                                    Tìm kiếm công việc:
                                    <br />
                            </div>                            
                            <form action="javascript:" class="search-bar">
                                <input id='title-search' type="search" name="search" pattern=".*\S.*" required />
                                <button onClick={() => searchWorkByTitleAndEmp()} class="search-btn" type="submit">
                                    <span>Search</span>
                                </button>
                            </form>
                            <div style={{ right: '10px' }} className="admin-post__button">
                                <button onClick={() => popUpAddForm()}>
                                    Thêm công việc mới
                                </button>
                            </div>
                        </div>
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    Lọc theo nhân viên:
                                    <br />
                            </div>
                            <div style={{ right: '10px'}} className="admin-post__button">
                                <select id='emp-list' onChange={(e) => onEmpFilterChange(e)}>
                                    <option value = "0"> Tất cả </option>
                                    {
                                        emp?.map((item,index) => (
                                        <option value={item?.id}> {item?.id} - {item?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                Danh sách công việc
                                <br />
                        </div>
                        <div className="admin-post__body">
                            <table id="admin-post__table">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tiêu đề</th>
                                        <th style={{ width: '200px' }}>Ngày bắt đầu</th>
                                        <th style={{ width: '200px' }}>Ngày kết thúc</th>
                                        <th style={{ width: '200px' }}>Người nhận việc</th>
                                        <th style={{ width: '200px' }}>Chi tiết công việc</th>
                                        <th style={{ width: '200px' }}>Xóa công việc</th>
                                    </tr>
                                    {
                                        workList?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.startDate}</td>
                                                <td>{item?.dueDate}</td>
                                                <td>{item?.buildingEmployee?.name}</td>
                                                <td>
                                                    <button onClick={() => popUpEditForm(index)} className="post-edit-item-btn">
                                                        <i className='bx bxs-pencil'></i>
                                                        Xem
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteClick(item.id)} className="post-delete-btn">
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
        </>
    )
}

export default Work;