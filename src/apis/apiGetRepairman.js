import React from 'react'
import { Url } from '../helpers/url'

export const apiGetRepairman = async(currentPage) => {
 const response=fetch(`${Url}/admin/repairmans/${currentPage}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    }
 })
 return (await response).json()
}
