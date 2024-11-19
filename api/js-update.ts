import { dbquery } from "utils/db"; /*import from absolute path need to edit jsconfig.json*/

export async function updateProduct(recordData: any) {
  //pattern recordData = {id:idNumber, column1: value1, column2: value2, column3: value3}
  const Data = recordData; //
  console.log("js-update.ts updateProduct data", Data);
  const values = [
    Data.product_id,
    Data.title,
    Data.subtitle,
    Data.imgurl,
    Data.description,
    Data.cursor,
    Data.content,
    Data.features,
    Data.certificates,
    Data.product_designed,
    Data.product_application,
  ];

  const updateQuery = `
    UPDATE products 
    SET title = $2, subtitle = $3, imgurl = $4, description = $5, cursor=$6, content=$7,features=$8, certificates=$9,product_designed=$10, product_application=$11
    WHERE product_id = $1
    RETURNING *;    `;
  // console.log('js-update.ts updateproducts query values[]', updateQuery,values);
  const res =await dbquery(updateQuery, values );
  console.log("js-update.ts update response:", res);

  return res
}

export async function addNewProduct(recordData: any) {
  //pattern recordData = {id:idNumber, column1: value1, column2: value2, column3: value3}
  const Data = recordData; //
  console.log("add newProduct receivedAPIdata", Data);
  const values = [
    Data.title,
    Data.subtitle,
    Data.imgurl,
    Data.description,
    Data.cursor,
    Data.content,
    Data.features,
    Data.certificates,
    Data.product_designed,
    Data.product_application,

  ];

  const addNewQuery = `
    INSERT INTO products (title , subtitle, imgurl, description, cursor, content,features, certificates,product_designed, product_application )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;    `;
   console.log(addNewQuery, Data);
  const res =await dbquery(addNewQuery, values );
  //console.log("update js res", res);

  return res
}

export async function updateProject(updateProjectData: any) {
  //pattern recordData = {id:idNumber, column1: value1, column2: value2, column3: value3}
  const Data = updateProjectData; //
  console.log("receivedUpdateProjectAPIdata", Data);
  const values = [
    Data.id,
    Data.title,
    Data.subtitle,
    Data.imgurl,
    Data.description,
  ];

  const updateQuery = `
      UPDATE projects
      SET title = $2, subtitle = $3, imgurl = $4, description = $5
      WHERE id = $1
      RETURNING *;    `;
  // console.log(updateQuery, Data, Url, typeof Url);
  //const res = dbquery(updateQuery);
  return dbquery(updateQuery, values);
}
export async function addUser(email, password) {
  const values = [email, password];
  const query = `
  INSERT INTO users (email, password) values ($1, $2)
  RETURNING *;
  `;
  return await dbquery(query, values);
  //console.log(res, "db res");
  //return res
}
