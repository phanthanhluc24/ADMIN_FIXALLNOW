import React from 'react'
import { Url } from '../helpers/url'

export const apiGetService =async (currentPage) => {
  const response=fetch(`${Url}/admin/service/${currentPage}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    }
  })
  return (await response).json()
}
