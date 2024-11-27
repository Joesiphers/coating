//const rooturl =process.env.JS_RESTURL
const rooturl = 'http://localhost:5002'
export  const getProductSummary = async (pageNumber=1)=>{
    const data= await fetch(`${rooturl}/products?page=${pageNumber}`)
    return data.json()
}
export async function getTotalPages():Promise<number> {
    const data=await fetch ('http://localhost:5002/products/total_pages')
    .then(res=>res.json())
    //    console.log("getPages",data)
return data.total_pages
  }
export const getProduct =async (product_id:number)=>{
    const data=await fetch (`${rooturl}/products/details?product_id=${product_id}`).then(res=>res.json())
    return data
}