import React, { useState, useEffect } from 'react'
import '../css/header.css'
import {
    Link
} from 'react-router-dom'

import { Redirect, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
// import Logo from './Logo'

const Header = () => {
    const [isLogout, setIsLogout] = useState(false);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    // const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [[token]])

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const logout = () => {
        // dispatch({type: LOGOUT, data: null})
        localStorage.removeItem("token")
        setIsLogout(true);
    }

    const showMenu = () => {
        const toggle = document.getElementById('header-toggle');
        const nav = document.getElementById('nav-menu');

        if (nav && toggle) {
            toggle.classList.toggle('bx-x')
            nav.classList.toggle('show')
        }
    }


    const linkAction = (id, status) => {
        const navLink = document.querySelectorAll('.nav__link');
        navLink.forEach(n => n.classList.remove('active'));
        if (id) {
            const _this = document.getElementById(id);
            _this.classList.add('active');
        }

        if (status === true) {
            const toggle = document.getElementById('header-toggle');
            const nav = document.getElementById('nav-menu');
            if (nav && toggle) {
                toggle.classList.remove('bx-x')
                nav.classList.remove('show')
            }
        }
    }


    return (isLogout) ? <Redirect to='/logout?redirect=true' /> : (
        <header className="header">
            <Link className="header__logo" to='/'  >
                MANAGEMENTBUILDING.COM
            </Link>
            <i className="bx bx-menu header__toggle" id="header-toggle" onClick={showMenu} />

            <nav className="nav" id="nav-menu" >
                <div className="nav__content bd-grid">
                    <Link className="nav__perfil" to='/' onClick={() => linkAction(null, true)}>
                        <div className="nav__name">
                            MANAGEMENTBUILDING.COM
                        </div>
                    </Link>
                    <div className="nav__menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link to='/intro' id="intro"
                                    className="nav__link"
                                    onClick={() => linkAction('intro', true)}
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li className="nav__item dropdown">
                                <div id="about" style={{ cursor: 'pointer' }}
                                    className="nav__link dropdown__link"
                                    onClick={() => linkAction('about', false)}>
                                    Quản lý tòa nhà
                                    <i className="bx bx-chevron-down dropdown__icon" />
                                </div>

                                <ul className="dropdown__menu">
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/company' onClick={() => linkAction('about', true)}>
                                            Công ty
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/floors' onClick={() => linkAction('about', true)}>
                                            Mặt bằng
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/monthly-fee-statistics' onClick={() => linkAction('about', true)}>
                                            Tiền tháng này
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/monthly-statistics' onClick={() => linkAction('about', true)}>
                                            Thống kê doanh thu
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/monthly-salary' onClick={() => linkAction('about', true)}>
                                            Thống kê lương tháng nhân viên
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav__item dropdown">
                                <div id="service" style={{ cursor: 'pointer' }}
                                    className="nav__link dropdown__link"
                                    onClick={() => linkAction('service', false)}>
                                    Quản lý Dịch vụ
                                    <i className="bx bx-chevron-down dropdown__icon" />
                                </div>

                                <ul className="dropdown__menu">
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/service-registration/companies' onClick={() => linkAction('service', true)}>
                                            Đăng ký dịch vụ
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/service-management' onClick={() => linkAction('service', true)}>
                                            Quản lý dịch vụ
                                        </Link>
                                    </li>
                                    {/* <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/' onClick={() => linkAction('about', true)}>
                                            Dịch vụ 2
                                        </Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link className="nav__link link__item" to='/' onClick={() => linkAction('about', true)}>
                                            Dịch vụ 3
                                        </Link>
                                    </li> */}
                                </ul>
                            </li>

                            <li className="nav__item">
                                <Link id='buildingemployee'
                                    className="nav__link"
                                    to={`/buildingemployee`}
                                    onClick={() => linkAction('buildingemployee', true)}>
                                    Quản lý nhân viên tòa nhà
                                </Link>
                            </li>

                            {/* <li className="nav__item">
                                <Link id='contact'
                                    className="nav__link"
                                    to={`/contact`}
                                    onClick={() => linkAction('contact', true)}>
                                    Liên hệ
                                </Link>
                            </li> */}

                            {
                                !token ?
                                    (
                                        <li className="nav__item">
                                            <Link id='contact'
                                                className="login-btn"
                                                to={`/login`}
                                                onClick={() => linkAction('contact', true)}>
                                                <div style={{ textAlign: 'center', color: '#fff' }} >ĐĂNG NHẬP</div>
                                            </Link>
                                        </li>
                                    ) :
                                    (
                                        <li className="nav__item dropdown">
                                            <div id='userSection'
                                                className="nav__link" >
                                                <div>
                                                    <i style={{ fontSize: "26px", marginRight: "5px" }} className='bx bxs-user-circle'></i>
                                                    {username}
                                                </div>
                                                {/* <span style={{display: token && isAdmin === 'true' ? 'none' : 'block', marginLeft: "30px", fontSize: "12px"}} 
                                        className="user-amount"> {localStorage.getItem('money') ? localStorage.getItem('money') : 0}đ </span> */}
                                            </div>
                                            <ul className="dropdown__menu">
                                                <li style={{ cursor: "pointer" }} className="dropdown__item" onClick={() => logout()}>
                                                    <div className="nav__link">
                                                        Đăng xuất
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header