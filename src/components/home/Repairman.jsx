import React, { useEffect, useState } from 'react'
import { apiGetRepairman } from '../../apis/apiGetRepairman';

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
  return (
    <div className="container_repairman">
      <div className="table-repairman">
        <table className='table table-light table-bordered'>
          <thead>
            <tr>
              <th className=' text-center'>STT</th>
              <th className=' text-center'>Họ và tên</th>
              <th className=' text-center'>Số điện thoại</th>
              <th className=' text-center'>Tổng dịch vụ</th>
              <th className=' text-center'>Địa chỉ</th>
              <th className=' text-center'>Trạng thái</th>
              <th className=' text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
          {repairmans.map((item,index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className='d-flex gap-2'>
                <p className='bold'>{item.repair.full_name}</p>
              </td>
              <td>{item.repair.number_phone}</td>
              <td>{item.service}</td>
              <td>{item.repair.address}</td>
              <td>{item.repair.status}</td>
              <td className='d-flex mr-2 justify-content-center'>
                <button className='btn btn-warning'>Khóa tài khoản</button>
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
