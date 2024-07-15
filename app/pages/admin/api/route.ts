import { updateProduct } from "api/updateAPI";
import { getProduct } from "api/getAPI";

export async function POST(request) {
  const req = await request.json(); //request.body; //request.body
  console.log(req, typeof req, "req");
  /*const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const products = await getProduct("all");*/
  const res = await updateProduct(req[0]);
  console.log(res, "res");
  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
