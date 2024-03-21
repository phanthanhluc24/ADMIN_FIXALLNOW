import React, { useEffect, useState } from 'react'
import { apiGetRepairmanFinder } from '../../apis/apiGetRepairmanFinder';
import { apiBlocAccount } from '../../apis/apiBlocAccount';
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
export const RepairmanFinder = () => {
  const history=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepairmanFinder, setTotalRepairmanFinder] = useState(1)
  const [repairmanFinders, setRepairmanFinders] = useState([])
  const pageSize = 7;
  const totalPages = Math.ceil(totalRepairmanFinder / pageSize);
  useEffect(() => {
    apiGetRepairmanFinder(currentPage)
      .then((res) => {
        setTotalRepairmanFinder(res.total)
        setRepairmanFinders(res.data)
      })
  }, [currentPage])
  const handelChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleBlockAccount = (id) => {
    Swal.fire({
      title: "Khóa tài khoản",
      text: "Bạn có chắc muốn khóa tài khoản này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        apiBlocAccount(id)
          .then((res) => {
            Swal.fire({
              title: "Khóa thành công",
              text: `${res.message}`,
              icon: "success"
            });
            window.location.reload()
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });

  }

  const handleOpenAccount = (id) => {
    Swal.fire({
      title: "Mở tài khoản",
      text: "Bạn có chắc muốn mở tài khoản này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        apiBlocAccount(id)
          .then((res) => {
            Swal.fire({
              title: "Mở thành công",
              text: `${res.message}`,
              icon: "success"
            });
            window.location.reload()
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  }

  return (
    <div className="container_repairman">
      <div className="table-repairman">
        <table className='table table-bordered'>
          <thead className='bg-primary text-center text-light'>
            <tr>
              <th className='tr-1'>STT</th>
              <th className='tr-2'>Họ và tên</th>
              <th className='tr-3'>Số điện thoại</th>
              <th className='tr-4'>Số lần đặt</th>
              <th className='tr-4'>Trạng thái</th>
              <th className='tr-5'>Hành động</th>
            </tr>
          </thead>
          <tbody className='bg-light'>
            {repairmanFinders.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.finder.full_name}</td>
                <td>{item.finder.number_phone}</td>
                <td>{item.booking}</td>
                <td>{item.finder.status == "active" ? ("Đang hoạt động") : ("Đã khóa")}</td>
                <td>
                  <td className='d-flex mr-2 justify-content-center'>
                    {item.finder.status == "active" ? (
                      <button className='btn btn-warning' onClick={() => handleBlockAccount(item.finder._id)}>Khóa tài khoản</button>
                    ) : (
                      <button className='btn btn-success' onClick={() => handleOpenAccount(item.finder._id)}>Mở khóa</button>
                    )}
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='d-flex gap-2 justify-content-center '>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handelChangePage(page)}
            className={`btn ${currentPage == page ? "btn-primary" : "btn-secondary"} `}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}
