const DATABASE_URL =
  "ppostgres://Joesiphers:j7ZgVUoK4tPn@ep-frosty-haze-09169370.ap-southeast-1.aws.neon.tech/neondb?options=endpoint%3Dep-frosty-haze-09169370";
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
    client.release();
    //console.log("quering : ", query, values, res.rows);
    return res.rows;
  } catch (error) {
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
