import React, { useEffect, useState } from 'react'
import { apiGetService } from '../../apis/apiGetService';
import { apiPermissionService } from '../../apis/apiPermissionService';
import Swal from "sweetalert2"

export const Service = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalService, setTotalService] = useState(1)
  const [services, setServices] = useState([])
  const pageSize = 7;
  const totalPages = Math.ceil(totalService / pageSize);
  useEffect(() => {
    apiGetService(currentPage)
      .then((res) => {
        setTotalService(res.total)
        setServices(res.data)
      })
  }, [currentPage])
  const handelChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleAllowPermission = (id) => {
    Swal.fire({
      title: "Duyệt dịch vụ",
      text: "Bạn muốn duyệt dịch vụ này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        apiPermissionService(id, 1)
          .then((res) => {
            Swal.fire({
              title: "Duyệt thành công",
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

  const handleReject = (id) => {
    Swal.fire({
      title: "Từ chối dịch vụ",
      text: "Bạn muốn từ chối dịch vụ này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        apiPermissionService(id, 2)
          .then((res) => {
            Swal.fire({
              title: "Từ chối thành công",
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
      <table className='table table-bordered text-center'>
  <thead className='bg-primary text-light'>
    <tr>
      <th>STT</th>
      <th>Thợ</th>
      <th>Dịch vụ</th>
      <th>Giá</th>
      <th>Ảnh bìa</th>
      <th>Mô tả</th>
      <th>Hành động</th>
    </tr>
  </thead>
  <tbody>
    {services.map((item, index) => (
      <tr key={item._id} className={index % 2 === 0 ? 'bg-light' : ''}>
        <td>{index + 1}</td>
        <td>{item.user_id.full_name}</td>
        <td>{item.service_name}</td>
        <td>{item.price}</td>
        <td><img className="img-thumbnail" style={{ width: 50, height: 50, borderRadius: '50%' }} src={item.image} alt="Ảnh bìa" /></td>
        <td>{item.desc.length > 30 ? item.desc.substring(0, 30) + "..." : item.desc}</td>
        <td>
          {item.status === "active" ? (
            <button className='btn btn-success' disabled>Đã được kiểm duyệt</button>
          ) : item.status === "reject" ? (
            <button className='btn btn-danger' disabled>Đã từ chối</button>
          ) : (
            <div className="btn-group" role="group">
              <button className='btn btn-success' onClick={() => handleAllowPermission(item._id)}>Duyệt dịch vụ</button>
              <button className='btn btn-warning' onClick={() => handleReject(item._id)}>Từ chối dịch vụ</button>
            </div>
          )}
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
