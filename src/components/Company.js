import React, {useState, useEffect} from 'react';
import '../css/company.css'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../redux/actions/company';

const Company = () => {
    const [isShow, setIsShow] = useState(false)
    const companies = useSelector(state => state.company.data)
    const [isAdd, setIsAdd] = useState(false);
    const location = useLocation();
    const [item, setItem] = useState({});
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCompany());
        return () => {
            console.log(location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const editClick = (index) => {
        setIsShow(true);
        setIsAdd(false);
        document.querySelector('.form-post').classList.add('active');
    }

    const popUpActive = (mode) => {
        setIsShow(true);
        setIsAdd(true);
        document.querySelector('.form-post').classList.add('active');
        if(mode === "edit") {
            document.querySelector('.dialog__title').textContent = "Sửa mục bài viết";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm mục bài viết";
            // document.querySelector('.form-post__field input').value = "";
            // document.querySelector('.form-post__field input').textarea = "";
        }
        // document.getElementById("imgInp").value="";
        // document.getElementById("blah").value = null;
    }

    const cancelClick = () => {
        setIsShow(false);
        setIsAdd(false);
        document.querySelector('.form-post').classList.remove('active');
    }

    const handleChange = () => {
        console.log('alo')
    }

    const imgChange = () => {
        const imgInp = document.getElementById('imgInp');
        const [file] = imgInp.files;
        if (file) {
            const imgPreview = document.getElementById('blah');
            imgPreview.src = URL.createObjectURL(file)
        }
    }

    const editTitleArticle = () => {
        
    }

    const editItemArticle = () => {
        if(isAdd){
            addItem();
            return;
        }
        const imgInp = document.getElementById('imgInp');
        const titleInp = document.getElementById('title-item').value;
        const contentInp = document.getElementById('content-item').value;
        const form = new FormData();
        const [file] = imgInp.files;
        if (file) {
            form.append('image', file);
        }
        else form.append('image', null);
        form.append('title', titleInp);
        form.append('content', contentInp);
        // if(item?.id)
        //     dispatch(editItem(item.id, form));
        cancelClick();
    }

    const removeItemArticle = (id) => {
        // if(id){
        //     dispatch(removeItem(id));
        // }
    }

    const addItem = () => {
        const imgInp = document.getElementById('imgInp');
        const titleInp = document.getElementById('title-item').value;
        const contentInp = document.getElementById('content-item').value;
        const form = new FormData();
        const [file] = imgInp.files;
        if (file) {
            form.append('image', file);
        }
        else form.append('image', null);
        // form.append('title', titleInp);
        // form.append('content', contentInp);
        // form.append('indexing', article.items.length+1);
        
        document.getElementById("imgInp").value=""; 
        document.getElementById("blah").value = null; 
        cancelClick();
    }

    return (
        <div style={{position: 'relative'}}>
            <div style={{display: isShow ? 'block' : 'none'}} className="modal"></div>
            <div className="form-post">
                <div className="form-post__title dialog__title">
                    Sửa Công ty
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
                                    companies?.items?.map((item, index) => (
                                        <tr key = {index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.taxCode}</td>
                                            <td>{item.authorizedCapital}</td>
                                            <td>{item.phoneNo}</td>
                                            <td>{item.employees.length}</td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    View Employee
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => editClick(index)} className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button className="post-delete-btn" onClick={() => removeItemArticle(item.id)}>
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