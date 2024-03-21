import { Url } from "../helpers/url"

export const apiPermissionService =async(id,option) => {
  const response=fetch(Url+`/admin/allowPermission/${id}/${option}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({})
  })
  return (await response).json()
}
