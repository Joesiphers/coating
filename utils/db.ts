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
    const client = await pool.connect();
    const res = await client.query(query, values);     
    console.log("db access connected")
    client.release();
    //console.log("quering : ", query, values, res.rows);
    return res.rows;
  } catch (error) {
    console.log("db access error : ", error)
    return error;
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
