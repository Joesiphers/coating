import { dbquery } from "utils/db"; /*import from absolute path need to edit jsconfig.json*/

export async function getProduct(id: number | "all") {
  const query = `SELECT * FROM products WHERE id=$1`;
  let values;
  if (id == "all") {
    try {
      const result = await dbquery(`SELECT * FROM products`);
      return result;
    } catch (err) {
      return err;
    }

  } else {
    values = [id];
    // console.log("dbquery", dbquery);
    try {
      return dbquery(query, values);
    } catch (err) {
      return err;
    }
  }
}

//id:number||"all": string

export async function getProject(id: number | "all") {
  const query = `SELECT * FROM projects WHERE id=$1`;
  let values;
  if (id == "all") {
    const result = await dbquery(`SELECT * FROM projects`);
    /* for (let i = 0; i < result.length; i++) {
      // console.log("dbquery-undefined-result", result[i].imgurl);

      result[i].imgurl = JSON.parse(result[i].imgurl);
      //  console.log("dbquery-undefined-result", result[i].imgurl);
      return result;
    }*/
    return result;
  } else {
    values = [id];
    // console.log("dbquery", dbquery);
    return dbquery(query, values);
  }
}
