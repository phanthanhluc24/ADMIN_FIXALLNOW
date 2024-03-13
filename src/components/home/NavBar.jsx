import React from 'react'
import { Link,Outlet,useLocation } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
export const NavBar = () => {
    const location=useLocation()
    // className={`side-bar-item ${location.pathname=="/gallery" ? "side-bar-item-background":""}`}
  return (
    <div className="nav_container">
        <div className="nav_header">
            <div className="nav_left">
                <img src={logo} alt="" />
                <span>Fix All Now</span>
            </div>
            <div className="nav_right">
                <span>Phan Thanh Luc</span>
                <img src={logo} alt="" />
            </div>
        </div>
        <div className="content-container">
            <div className="selection_nav">
                {/* <div className="selection_link"> */}
                    <Link className={`selection_link ${location.pathname=="/admin/manage/repairman" ? "side-bar-item-background":""}`} to={"/admin/manage/repairman"}>Thợ</Link>
                {/* </div> */}
                {/* <div className="selection_link"> */}
                    <Link className={`selection_link ${location.pathname=="/admin/manage/repairman_finder" ? "side-bar-item-background":""}`} to={"/admin/manage/repairman_finder"}>Người tìm thợ</Link>
                {/* </div> */}
                {/* <div className="selection_link"> */}
                    <Link className={`selection_link ${location.pathname=="/admin/manage/service" ? "side-bar-item-background":""}`} to={"/admin/manage/service"}>Kiểm duyệt dịch vụ</Link>
                {/* </div> */}
            </div>
            <div className="body_content">
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}
