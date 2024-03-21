import React, { useEffect, useState } from 'react'
import { apiGetRepairman } from '../../apis/apiGetRepairman';
import { apiBlocAccount } from '../../apis/apiBlocAccount';
import Swal from "sweetalert2"
export const Repairman = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepairman, setTotalRepairman] = useState(1)
  const [repairmans, setRepairmans] = useState([])
  const pageSize = 7;
  const totalPages = Math.ceil(totalRepairman / pageSize);
  useEffect(() => {
    apiGetRepairman(currentPage)
      .then((res) => {
        setTotalRepairman(res.total)
        setRepairmans(res.data)
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
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Tổng dịch vụ</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className='bg-light'>
            {repairmans.map((item, index) => (
              <tr key={index}>
                <td className='text-center'>{index + 1}</td>
                <td>{item.repair.full_name}</td>
                <td>{item.repair.number_phone}</td>
                <td>{item.service}</td>
                <td>{item.repair.address}</td>
                <td>{item.repair.status === "active" ? "Đang hoạt động" : "Chưa kiểm duyệt"}</td>
                <td className='d-flex justify-content-center'>
                  {item.repair.status === "active" ? (
                    <button className='btn btn-warning' onClick={() => handleBlockAccount(item.repair._id)}>Khóa tài khoản</button>
                  ) : (
                    <button className='btn btn-success' onClick={() => handleOpenAccount(item.repair._id)}>Duyệt tài khoản</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      <div className='d-flex gap-2 justify-content-center pb-3'>
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
