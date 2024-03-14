import React from 'react'
import { Url } from '../helpers/url'

export const apiGetRepairmanFinder =async (currentPage) => {
  const response=fetch(`${Url}/admin/repairmanFinder/${currentPage}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    }
  })
  return (await response).json()
}
