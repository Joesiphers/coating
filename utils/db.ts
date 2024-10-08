const DATABASE_URL =process.env.DATABASE_URL

import { Pool } from "pg";
export async function dbquery(
  query: string,
  values?: number[] | string[] | "all",
) {
  const pool = new Pool({
    connectionString: DATABASE_URL, 
    ssl: { require: true },
  });
  try {
   // console.log("db.ts attempt connection", query, values)

    const client = await pool.connect();
   // console.log("db.ts access connected", query, values)
    const res = await client.query(query, values);     
    //console.log("db.ts get res", query, values)
    client.release();
    //console.log("quering : ", query, values, res.rows);
    return res.rows;
  } catch (error) {
    console.log("db access error : ", error)
    throw new Error( "Data Access error");
  }
}
/** const query = `
  INSERT INTO pipe_know (${fields})
  VALUES ($1,$2) 
  RETURNING *;`;
  const value =["value1,value2"]
   */
/**
 * const query = {
  text: 'SELECT * FROM your_table WHERE id = $1',//DELETE FROM tablename WHERE xxx=$1
  values: [recordIdToSelect],
};
 */
