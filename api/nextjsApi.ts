/**api use nodejs, nextjs as server to fetch data from DB */

import { dbquery } from "utils/db"; /*import from absolute path need to edit jsconfig.json*/

export async function getProduct(id: number | "all") {
  console.log("api/nextjsApi getProducts with" , id)
  try{
    if (id=="all"){
      return await dbquery(`SELECT * FROM products`)
    }
    else{
      const values=[id];
      const query = `SELECT * FROM products WHERE id=$1`;
      
      const data =await dbquery (query, values)
      return data[0]
      }
    }
  catch(error){
    console.error("nextjsApi API got error", error)
    throw error
  }
}

export async function getProductSummary(id: number | "all") {
  //console.log("api/nextjsApi getProductsSummary with" , id)
  try{
    if (id=="all"){
      return await dbquery(`SELECT id, title, imgurl,subtitle FROM products`)
    }
    else{
      const values=[id];
      const query = `SELECT * FROM products WHERE id=$1`;
      return await dbquery (query, values)
      }
    }
  catch(error){
    console.error("nextjsApi API got error", error)
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
