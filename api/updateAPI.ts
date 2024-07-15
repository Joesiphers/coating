import { dbquery } from "utils/db"; /*import from absolute path need to edit jsconfig.json*/

export async function updateProduct(recordData: any) {
  //pattern recordData = {id:idNumber, column1: value1, column2: value2, column3: value3}
  const Data = recordData; //
  console.log("receivedAPIadat", Data);
  const values = [
    Data.id,
    Data.title,
    Data.subtitle,
    Data.imgurl,
    Data.description,
  ];

  const updateQuery = `
    UPDATE products 
    SET title = $2, subtitle = $3, imgurl = $4, description = $5
    WHERE id = $1
    RETURNING *;    `;
  // console.log(updateQuery, Data, Url, typeof Url);
  //const res = dbquery(updateQuery);
  return dbquery(updateQuery, values);
}
/*    SET title = ${values[1]}  subtitle = ${values[2]} imgUrl = ${values[3]} desctription = ${values[4]}

/*const query = `
UPDATE products
SET column1 =$1, column2 = $2
WHERE id = $1`;
const fields = Object.keys(recordData);
const values = Object.values(recordData);
/*  const query = `
  INSERT INTO pipe_know (${fields})
  VALUES (${valueNumber}) 
  RETURNING *;`;
  */
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
