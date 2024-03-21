import React, { useEffect, useState } from 'react'
import "../../assets/sass/Index.scss"
import login_image from "../../assets/images/form_image.png"
import logo from "../../assets/images/logo.png"
import { apiAdminLogin } from '../../apis/apiAdminLogin'
import {useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
export const Login = () => {
    const [login, setLogin] = useState({ email: "", password: "" })
    const [error, setError] = useState({ email: "", password: "" })
    const [serverError,setServerError]=useState("")
    const navigate=useNavigate ()
    const handleInput = (e) => {
        const value = { ...login, [e.target.name]: e.target.value }
        setLogin(value)
    }
    useEffect(() => {
        const validateEmailRegex = /^\S+@\S+\.\S+$/;
        if (login.email != "" && !validateEmailRegex.test(login.email)) {
            setError({ ...error, email: "Email không hợp lệ" });
            setServerError("")
        } else {
            setError({ ...error, email: "" });
        }
    }, [login.email]);

    useEffect(() => {
        const validatePasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (login.password != "" && !validatePasswordRegex.test(login.password)) {
            setError({ ...error, password: "Vui lòng bao gồm số chữ cái hoa, thường và đặc biệt" });
            setServerError("")
        } else {
            setError({ ...error, password: "" });
        }
    }, [login.password]);


    const handleAdminLogin = (e) => {
        e.preventDefault()
        apiAdminLogin(login)
        .then((res)=>{
            if (res.status!=201) {
               setServerError(res.message)
               return
            }
            const maxAgeInSeconds = 7 * 24 * 60 * 60;
            Cookies.set("accessToken",res.accessToken,{expires: maxAgeInSeconds })
            navigate("admin/manage/repairman")
        })
    }

    useEffect(()=>{
        const cookies=Cookies.get("accessToken")
        if (cookies) {
            navigate("admin/manage/repairman")
        }
    },[])
    return (
        <>
            <div className="container_login">
                <div className="login_grid">
                    <div className="login_image">
                        <img src={login_image} alt="" />
                    </div>
                    <div className="login_form">
                        <div className="form_logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="text-app">
                            <p>Fix All Now</p>
                        </div>
                        <div className="form_login">
                            <p style={{color:"red"}}>{serverError}</p>
                            <form action="" method="post" onSubmit={handleAdminLogin}>
                                <div className="form_group">
                                    <input type="email" name='email' placeholder='Vui lòng nhập email' onChange={handleInput} />
                                    <br />
                                    <span style={{ color: "red", fontWeight: "bold" }}>{error.email}</span>
                                </div>
                                <div className="form_group">
                                    <input type="password" name='password' placeholder='Vui lòng nhập mật khẩu' onChange={handleInput} />
                                    <br />
                                    <span style={{ color: "red", fontWeight: "bold" }}>{error.password}</span>
                                </div>
                                <div className="btn-submit">
                                    <button type='submit' style={{ backgroundColor: "#FCA234" }}>Đăng nhập</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
