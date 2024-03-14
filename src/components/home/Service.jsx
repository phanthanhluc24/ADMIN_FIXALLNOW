import React, { useEffect, useState } from 'react'
import { apiGetService } from '../../apis/apiGetService';

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
  return (
    <div className="container_repairman">
    <div className="table-repairman">
      <table className='table table-light table-bordered text-center'>
        <thead>
          <tr>
            <th className='tr-1'>STT</th>
            <th className='tr-6'>Thợ</th>
            <th className='tr-7'>Dịch vụ</th>
            <th className='tr-8'>Giá</th>
            <th className='tr-9'>Ảnh bìa</th>
            <th className='tr-10'>Mô tả</th>
            <th className='tr-11'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{item.user_id.full_name}</td>
              <td>{item.service_name}</td>
              <td>{item.price}</td>
              <td><img style={{width:50,height:50,borderRadius:50}} src={item.image} alt="" /></td>
              <td>{item.desc.length > 30 ? item.desc.substring(0, 30) + "..." : item.desc}</td>
              <td className='d-flex gap-2'>
              <button className='btn btn-success'>Duyệt dịch vụ</button>
              <button className='btn btn-warning'>Từ chối dịch vụ</button>
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
            className={`btn ${currentPage==page ? "btn-primary":"btn-secondary" } `}
            >
              {page}
          </button>
        ))}
      </div>
  </div>
  )
}
