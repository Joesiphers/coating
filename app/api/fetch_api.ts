const ROOT_URL =process.env.ROOT_URL

export  const getProductSummary = async (pageNumber=1)=>{
    const data= await fetch(`${ROOT_URL}/products?page=${pageNumber}`)
                        .then(res=>res.json())
                        .catch(err=>console.log("getProductSummary", err))
   // console.log("getProductSummary", data)                        
                        return data
}
export async function getTotalPages():Promise<number> {
    console.log ("url ",ROOT_URL+'/products/total_pages' )
    const data=await fetch (ROOT_URL+'/products/total_pages')
    .then(res=>res.json())
    //    console.log("getPages",data)
return data.total_pages
  }
export const getProduct =async (product_id:number)=>{
    const data=await fetch (`${ROOT_URL}/products/details?product_id=${product_id}`).then(res=>res.json())
    return data
}
export const getProject =async (project_id:string)=>{
    const data=await fetch (`${ROOT_URL}/projects/details?project_id=${project_id}`).then(res=>res.json())
    return data
}

export const getProductTitleByID =async (product_id_array:number [])=>{
    const query = JSON.stringify(product_id_array)
    const data = await fetch (`${ROOT_URL}/products/details?product_id=${query}`).then(res=>res.json())
}

export  const getProjectSummary = async (pageNumber=1)=>{
    const data= await fetch(`${ROOT_URL}/projects?page=${pageNumber}`)
                        .then(res=>res.json())
                        .catch(err=>console.log("getProjectSummary", err))
   // console.log("getProjectSummary", data)                        
                        return data
}
export async function getProjectTotalPages():Promise<number> {
    const data=await fetch (ROOT_URL+'/projects/total_pages')
    .then(res=>res.json())
    //    console.log("getPages",data)
return data.total_pages
  }