import React, { useEffect, useState } from 'react'
import { apiGetRepairmanFinder } from '../../apis/apiGetRepairmanFinder';

export const RepairmanFinder = () => {
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
  return (
    <div className="container_repairman">
    <div className="table-repairman">
      <table className='table table-light table-bordered text-center'>
        <thead>
          <tr>
            <th className='tr-1'>STT</th>
            <th className='tr-2'>Họ và tên</th>
            <th className='tr-3'>Số điện thoại</th>
            <th className='tr-4'>Số lần đặt</th>
            <th className='tr-4'>Trạng thái</th>
            <th className='tr-5'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {repairmanFinders.map((item,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{item.finder.full_name}</td>
            <td>{item.finder.number_phone}</td>
            <td>{item.booking}</td>
            <td>{item.finder.status}</td>
            <td>
            <td className='d-flex mr-2 justify-content-center'>
                <button className='btn btn-warning'>Khóa tài khoản</button>
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
            className={`btn ${currentPage==page ? "btn-primary":"btn-secondary" } `}
            >
            <p>
              {page}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
