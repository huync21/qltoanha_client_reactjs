import React, {useState, useEffect} from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany, createNewCompany, updateCompany, deleteCompany } from '../redux/actions/company';

const Company = () => {
    const [isShow, setIsShow] = useState(false)
    const data = useSelector(state => state.company.data)
    const [companies, setCompanies] = useState(data);
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [indexEditCompany, setIndexEditCompany] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCompany());
        return () => {
            console.log(location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setCompanies(data);
    }, [data])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        setIndexEditCompany(index);
        document.getElementById('name').value = companies[index].name;
        document.getElementById('tax-code').value = companies[index].taxCode;
        document.getElementById('authorized-capital').value = companies[index].authorizedCapital;
        document.getElementById('phone-no').value = companies[index].phoneNo;
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if(mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa thông tin công ty";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm mới công ty";
        }
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    }

    const addOrUpdateItem = () => {
        if(isAdd){
            addItem();
        }
        else{
            editCompany();
        }
        
        cancelClick();
        window.location.reload();
    }

    const editCompany = () => {
        const name = document.getElementById('name').value;
        const taxCode = document.getElementById('tax-code').value;
        const authorizedCapital = document.getElementById('authorized-capital').value;
        const phoneNo = document.getElementById('phone-no').value;
        
        const data = {
            name: name,
            taxCode: taxCode,
            authorizedCapital: Number(authorizedCapital),
            phoneNo: phoneNo
        }
        dispatch(updateCompany(companies[indexEditCompany].id, data));
    }

    const removeCompany = (id) => {
        if(id){
            dispatch(deleteCompany(id));
            window.location.reload();
        }
    }

    const addItem = () => {
        const name = document.getElementById('name').value;
        const taxCode = document.getElementById('tax-code').value;
        const authorizedCapital = document.getElementById('authorized-capital').value;
        const phoneNo = document.getElementById('phone-no').value;
        
        const data = {
            name: name,
            taxCode: taxCode,
            authorizedCapital: Number(authorizedCapital),
            phoneNo: phoneNo
        }

        dispatch(createNewCompany(data));
        
        cancelClick();
    }

    const viewEmployee = (id) => {

    }

    return (
        <div style={{position: 'relative'}}>
            <div style={{display: isShow ? 'block' : 'none'}} className="modal">
            <div className="form-post">
                <div className="form-post__title dialog__title">
                    Thêm mới công ty
                </div>
                <div className="form-post__content">
                    <div className="form-post__wrapper">
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='name' placeholder = "Name"/>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='tax-code' placeholder = "Tax code"/>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='authorized-capital' placeholder = "Authorized Capital"/>
                        </div>
                        <div className="form-post__field">
                            <input style={{width: '100%'}} type="text" id='phone-no' placeholder = "Phone No"/>
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
                        <div style={{fontSize: "20px", marginLeft: "-20px"}} className="admin-post__title">
                            Danh sách công ty
                        </div>
                        <div style={{right: '10px'}} className="admin-post__button">
                            <button onClick={() => popUpActive()}>
                                Thêm công ty
                            </button>
                        </div>
                    </div>
                    <div className="admin-post__body">
                        <table id="admin-post__table">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th style={{width: '200px'}}>Name</th>
                                    <th style={{width: '200px'}}>Tax code</th>
                                    <th style={{width: '200px'}}>Authorized Capital</th>
                                    <th style={{width: '200px'}}>Phone No</th>
                                    <th style={{width: '200px'}} >Employees</th>
                                    <th style={{width: '105px'}}>View Employee</th>
                                    <th style={{width: '105px'}}>Sửa</th>
                                    <th style={{width: '105px'}} >Xóa</th>
                                </tr>
                                {
                                    companies?.map((item, index) => (
                                        <tr key = {index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.taxCode}</td>
                                            <td>{item.authorizedCapital}</td>
                                            <td>{item.phoneNo}</td>
                                            <td>{item?.numberOfEmployee}</td>
                                            <td>
                                                <button onClick={() => viewEmployee(item.id)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    View
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeCompany(item.id)}>
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
};

export default Company;