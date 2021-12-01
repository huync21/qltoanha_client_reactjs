import React, {useState, useEffect} from 'react'
import {Redirect, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import '../css/login.css'
import imgPath from '../assets/img/img-login.svg'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const token = null;
    const checkError = false;
    const [loginOrSignUp, setLoginOrSignUp] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if(checkError === true){
            if(loginOrSignUp) {
                document.querySelector('.msg-log').textContent = "Đăng nhập thất bại";
                document.querySelector('.msg-log').classList.add('active');
                setTimeout(() => {
                    document.querySelector('.msg-log').classList.remove('active');
                    setVisible(false);
                }, 1200);
                console.log("Đăng nhập thất bại!");
            }
                
            else  {
                document.querySelector('.msg-log').textContent = "Đăng kí thất bại";
                document.querySelector('.msg-log').classList.add('active');
                setTimeout(() => {
                    document.querySelector('.msg-log').classList.remove('active');
                    setVisible(false);
                }, 1200);
                console.log("Đăng kí thất bại");
            }
        }
        return () => {
            document.querySelector('.msg-log').textContent = "Lỗi thực hiện!!";
            document.querySelector('.msg-log').classList.add('active');
            setTimeout(() => {
                document.querySelector('.msg-log').classList.remove('active');
                setVisible(false);
            }, 1200);
            console.log("Login/SignUp error")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkError])
    const toggleLogin = (mode) => {
        const loginIn = document.getElementById('login-in')
        const loginUp = document.getElementById('login-up')
        if(mode === "signUpMode") {
            loginIn.classList.remove('block')
            loginUp.classList.remove('none')
            // Add classes
            loginIn.classList.toggle('none')
            loginUp.classList.toggle('block')
        }
        else {
            loginIn.classList.remove('none')
            loginUp.classList.remove('block')
            // Add classes
            loginIn.classList.toggle('block')
            loginUp.classList.toggle('none')
        }
    }

    function validateEmail(email) {
        return email.trim().split('@')[1] !== 'gmail.com' ? false : true;
    }

    const signUp = (e) => {
        e.preventDefault();
        const usernameTag = document.querySelector('#username-up');
        const emailTag = document.querySelector('#email-up');
        const passwordTag = document.querySelector('#password-up');
        if(username.trim().length < 6){
            usernameTag.parentElement.classList.add('empty');
            return;
        }
        if(!validateEmail(email)){
            emailTag.parentElement.classList.add('emailError');
            return;
        }
        if(password.trim().length < 6 ){
            passwordTag.parentElement.classList.add('numError');
            return;
        }
        const data = {
            username: username,
            password: password,
            email: email,
            emailOwner: 'vuthanhcong110502@gmail.com'
        }
        setLoginOrSignUp(false);
        if(location.pathname === '/login')
            console.log(data);
    }

    const signIn = (e) => {
        e.preventDefault();
        const emailTag = document.querySelector('#email').parentElement;
        const passwordTag = document.querySelector('#password').parentElement;

        if(!validateEmail(email)){
            emailTag.classList.add('emailError');
            return;
        }
        if(password.trim().length < 6 ){
            passwordTag.classList.add('numError');
            return;
        }

        // api
        const data = {
            email: email,
            password: password
        }
        console.log(data);
    }


    const onFocusInput = (e) => {
        const tempClassName = e.target.parentElement.classList[1];
        if(tempClassName) {
            e.target.parentElement.classList.remove(tempClassName);
        }
    }


    return (token) ?
    <Redirect to="/"/> : (
        <div className="login">
            <div className="msg-log">MSG LOG nè</div>
            <div className="login__content">
                <div className="login__img">
                    <img src={imgPath} alt="" />
                </div>
                <div className="login__forms">
                    <form className="login__registre" id="login-in">
                        <h1 className="login__title">Đăng nhập</h1>
                        <div className="login__box">
                            <i className="bx bx-at login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="email" 
                                placeholder="Email" 
                                className="login__input" 
                                onChange = {(e) => setEmail(e.target.value)}
                                id="email"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-lock-alt login__icon" />
                            <input
                                onFocus={onFocusInput}
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login__input"
                                autoComplete="on"
                                onChange = {(e) => setPassword(e.target.value)}
                                id="password"
                            />
                        </div>
                        <button onClick={(e) => signIn(e)} className="login__button">
                            Đăng nhập
                        </button>
                        <div>
                            <span className="login__account">Bạn chưa có tài khoản? </span>
                            <span className="login__signin" id="sign-up" onClick={() =>toggleLogin('signUpMode')}>
                                Đăng kí
                            </span>
                        </div>
                    </form>
                    <form className="login__create none" id="login-up">
                        <h1 className="login__title">Tạo tài khoản</h1>
                        <div className="login__box">
                            <i className="bx bx-user login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="text" 
                                placeholder="Username" 
                                className="login__input" 
                                onChange = {(e) => setUsername(e.target.value)}
                                id="username-up"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-at login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="email" 
                                placeholder="Email" 
                                className="login__input" 
                                onChange = {(e) => setEmail(e.target.value)}
                                id="email-up"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-lock-alt login__icon" />
                            <input
                                onFocus={onFocusInput}
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login__input"
                                autoComplete="on"
                                onChange = {(e) => setPassword(e.target.value)}
                                id="password-up"
                            />
                        </div>
                        <button onClick={(e) => signUp(e)} className="login__button">
                            Đăng kí
                        </button>
                        <div>
                            <span className="login__account">Bạn đã có tài khoản? </span>
                            <span className="login__signup" id="sign-in" onClick={() =>toggleLogin('signInMode')}>
                                Đăng nhập
                            </span>
                        </div>
                        {/* <div className="login__social">
                            <Link to='/'  className="login__social-icon">
                                <i className="bx bxl-facebook" />
                            </Link>
                            <Link to='/'  className="login__social-icon">
                                <i className="bx bxl-twitter" />
                            </Link>
                            <Link to='/'  className="login__social-icon">
                                <i className="bx bxl-google" />
                            </Link>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
