import React, { useState, useEffect } from 'react';
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../redux/actions/company';
import { useLocation } from 'react-router';
import { getFloorById } from '../redux/actions/floor';
import { getTheRestArea, createContract, getCompaniesForRegistrationByName } from '../redux/actions/rented_area';
import { Redirect } from 'react-router';
import '../css/search_bar.css'
import '../css/validation.css'
const ContractCompany = () => {
    const [is_rentedDate_null, setIsRentedDateNull] = useState(false)
    const [is_expiredDate_null, setIsExpiredDateNull] = useState(false)
    const [is_number, setIsNumber] = useState(false)
    const [is_ground_empty, setIsGroundEmpty] = useState(false)
    const [is_ground_area_empty, setIsGroundAreaEmpty] = useState(false)
    const [is_not_over_rest_area, setIsNotOverRestArea] = useState(false)
    const data = useSelector(state => state.company.data)
    const [companies, setCompanies] = useState(data);
    const location = useLocation();
    const [isShow, setIsShow] = useState(false)
    const [company, setCompany] = useState(null)
    const floor = useSelector(state => state.floors.floor)
    const search = useLocation().search;
    const floorId = new URLSearchParams(search).get('floorId');
    const dispatch = useDispatch();
    const restAreaFromReducer = useSelector(state => state.rentedAreas.restArea)

    //form states

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [rentArea, setRentArea] = useState(0)
    const [position, setPosition] = useState("")
    const [companyName, setCompanyName] = useState(null)
    const [doneRegistration, setDoneRegistration] = useState(false)
    useEffect(() => {
        dispatch(getAllCompany());
        dispatch(getFloorById(floorId))
        dispatch(getTheRestArea(floorId))
        console.log("use effect 1");
        return () => {
            console.log(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        setCompanies(data);
        console.log("use effect 2");
    }, [data])


    // Mở pop up edit item
    const popUpEditForm = (item) => {
        initBooleanFalse();
        setCompany(item)
        setIsShow(true)
        document.querySelector('.form-post').classList.add('active');
    }

    // Tắt pop up
    const cancelClick = () => {
        setIsShow(false)
    }

    const startDateOnChange = (e) => {
        setStartDate(e.target.value)
    }
    const endDateOnChange = (e) => {
        setEndDate(e.target.value)
    }

    const rentAreaChange = (e) => {
        setRentArea(e.target.value)
    }

    const positionChange = (e) => {
        setPosition(e.target.value)
    }
    const initBooleanFalse = () => {
        setIsNumber(true)
        setIsExpiredDateNull(false)
        setIsRentedDateNull(false)

        setIsNotOverRestArea(true)
        setIsGroundEmpty(false)
    }
    const initBooleanTrue = () => {
        setIsNumber(false)
        setIsExpiredDateNull(true)
        setIsRentedDateNull(true)

        setIsNotOverRestArea(false)
        setIsGroundEmpty(true)
    }
    const registerContract = () => {
        initBooleanTrue()
        if (startDate) setIsRentedDateNull(false)
        if (endDate) setIsExpiredDateNull(false)
        if (isNaN(rentArea)) setIsNumber(true)
        if (rentArea && rentArea <= restAreaFromReducer) setIsNotOverRestArea(false)
        if (position && position != "") setIsGroundEmpty(false)
        if (is_number && !is_expiredDate_null && !is_rentedDate_null && !is_ground_empty && !is_not_over_rest_area) {
            const contract = {
                rentedDate: startDate,
                expiredDate: endDate,
                rentedArea: rentArea,
                position: position
            }

            dispatch(createContract(company.id, floorId, contract))
            setTimeout(() => {
                setDoneRegistration(true)
            }, 1000)
        }




    }
    const searchBarChange = (e) => {
        setCompanyName(e.target.value)
    }

    const findCompaniesByNameClick = () => {
        dispatch(getCompaniesForRegistrationByName(companyName))
    }
    return (
        doneRegistration ?
            <Redirect push to={{
                pathname: "/rented-areas",
                search: `?floorId=` + floorId,
            }} />
            :
            <>
                <div style={{ position: 'relative' }} >
                    <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                        <div className="modal_overlay"></div>
                        <div className="form-post" style={{ height: "700px" }}>
                            <div className="form-post__title dialog__title">
                                Đăng ký hợp đồng thuê
                            </div>

                            <div className="form-post__content">
                                <div className="form-post__wrapper">
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Tên công ty: {company?.name}</strong> </p>
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>{floor?.name} có diện tích còn lại là: {restAreaFromReducer}</strong> </p>
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Ngày bắt đầu:</strong></p>
                                        <input onChange={(e) => { startDateOnChange(e) }} style={{ width: '100%' }} type="date" id='start-date' placeholder="Ngày bắt đầu" />
                                        {is_rentedDate_null ? <p className="font-validation" style={{ color: 'red' }}>Vui lòng chọn ngày bắt đầu</p> : ""}
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Ngày kết thúc:</strong></p>
                                        <input onChange={(e) => { endDateOnChange(e) }} style={{ width: '100%' }} type="date" id='end-date' placeholder="Ngày kết thúc" />
                                        {is_expiredDate_null ? <p className="font-validation">Vui lòng chọn ngày kết thúc</p> : ""}
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Diện tích thuê:</strong></p>
                                        <input onChange={(e) => { rentAreaChange(e) }} style={{ width: '100%' }} type="text" id='description' placeholder="Diện tích thuê" />
                                        {is_number ? "" : <p className="font-validation">Vui lòng nhập số</p>}
                                        {is_number && is_not_over_rest_area ? "" : <p className="font-validation">Vui lòng chọn diện tích bé hơn diện tích còn lại</p>}
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Tên khu vực thuê:</strong></p>
                                        <input onChange={(e) => { positionChange(e) }} style={{ width: '100%' }} type="text" id='description' placeholder="Diện tích thuê" />
                                        {is_ground_empty ? <p className="font-validation">Vui lòng nhập vị trí</p> : ""}
                                    </div>
                                </div>
                                <div className="form-post__control">
                                    <button onClick={() => cancelClick()} className="cancel-btn">
                                        Hủy
                                    </button>
                                    <button onClick={() => { registerContract() }} className="add-section-btn" >
                                        <i className='bx bx-save' ></i>
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                        <div className="admin-post__wrapper">
                            <div className="admin-post__head">
                                <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    Chọn công ty để đăng ký hợp đồng
                                </div>
                                <form action="javascript:" class="search-bar" style={{ marginRight: "-45px" }}>
                                    <input value={companyName} onChange={(e) => { searchBarChange(e) }} type="search" name="search" pattern=".*\S.*" required />
                                    <button onClick={() => { findCompaniesByNameClick() }} class="search-btn" type="submit">
                                        <span>Search</span>
                                    </button>
                                </form>
                            </div>
                            <div className="admin-post__body">
                                <table id="admin-post__table">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th style={{ width: '200px' }}>Tên công ty</th>
                                            <th style={{ width: '200px' }}>Mã số thuế</th>
                                            <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                            <th style={{ width: '200px' }}>SĐT</th>
                                            <th style={{ width: '200px' }} >Sô nhân viên</th>
                                            <th style={{ width: '200px' }}>Đăng ký hợp đồng</th>
                                        </tr>
                                        {
                                            companies?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.taxCode}</td>
                                                    <td>{new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item?.authorizedCapital)}</td>
                                                    <td>{item?.phoneNo}</td>
                                                    <td>{item?.numberOfEmployee}</td>
                                                    <td>
                                                        <button onClick={() => popUpEditForm(item)} className="post-edit-item-btn" style={{ width: "200px" }}>
                                                            <i className='bx bxs-pencil'></i>
                                                            Đăng ký hợp đồng
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
};

export default ContractCompany;