/**api use nodejs, nextjs as server to fetch data from DB */

import { dbquery } from "utils/db"; /*import from absolute path need to edit jsconfig.json*/
export async function getPages():Promise<number> {
  const data=await dbquery('select count(*) from products')
  const pages=data[0].count;
  return pages
}
export async function getProduct(product_id: number | "all") {
  //console.log("api/js-get getProducts with" , product_id)
  try{
    if (product_id=="all"){
      return await dbquery(`SELECT * FROM products`)
    }
    else{
      const values=[product_id];
      const query = `SELECT * FROM products WHERE product_id=$1`;
      const data =await dbquery (query, values)
      const product = data[0]
      //product.imgurl=JSON.parse(product.imgurl)
     // console.log("product", product)
      //product.features=JSON.parse(product.features)
      return product
      }
    }
  catch(error){
    console.error("nextjsApi API got error", error)
    throw error
  }
}

export async function getProductSummary(cursor:number,product_batch: number | "all") {
  //console.log("api/nextjsApi getProductsSummary with" , product_id)
  try{
    if (product_batch=="all"){
      return await dbquery(`SELECT product_id, title, imgurl,subtitle FROM products`)
    }
    else{
      const values=[cursor, product_batch];
      const query = `SELECT * FROM products ORDER BY product_id limit $2 OFFSET $1`;
      return await dbquery (query, values)
      }
    }
  catch(error){
    console.error("nextjsApi API got error", error)
    throw error
  }
}

export async function loadMoreProducts (cursor:number,batch:number ){
  try {
      const values = [cursor,batch];
      const query = `SELECT * FROM products ORDER BY product_id LIMIT $2 OFFSET $1`;
      return await dbquery(query, values);

  }catch (error) {
    console.error("nextjsApi loadMoreProducts got error", error)
    throw error
  }

}


export async function getProject(id: number | "all") {

  try {
    if (id == "all") {
      return await dbquery(`SELECT * FROM projects`);
  }
    else {
      const values = [id];
      const query = `SELECT * FROM projects WHERE id=$1`;
      const projectData:string[] =await dbquery(query, values);
      return projectData[0]
    }
  } catch (err) 
    { console.log("getProject api Error")
      throw err
    }       

  }
