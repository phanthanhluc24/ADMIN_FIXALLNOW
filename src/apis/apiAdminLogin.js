import React from 'react'
import { Url } from '../helpers/url'

export const apiAdminLogin =async(data) => {
  const response=fetch(`${Url}/admin/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  return (await response).json()
}
