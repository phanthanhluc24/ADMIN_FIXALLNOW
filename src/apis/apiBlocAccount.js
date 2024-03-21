import { Url } from "../helpers/url"

export const apiBlocAccount =async(id) => {
  const response=fetch(Url+`/admin/blockAccount/${id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({})
  })
  return (await response).json()
}
