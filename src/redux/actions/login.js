import axios from "axios";
import { ERROR } from "../constants/base";
import { LOGIN, SIGNUP } from "../constants/login";
export const login = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: 'http://localhost:8080',
            url: "login",
            data: data
        });

        if(res.status == 200 ){
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("username", res.data.username);
            dispatch({
                type: LOGIN,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null
        })
    }
    return null;
}


export const signUp = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: "register",
            data: data
        });

        if(res.status == 200 ){
            dispatch({
                type: SIGNUP,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null
        })
    }
    return null;
}