import { updateProduct } from "@/api/updates";
import { getProduct } from "api/gets";

import fs from "fs";
import path from "node:path";
import { v4 as uuiv4 } from "uuid";

export async function POST(request) {
  console.log("req");
  //const req = fileUpload.array("files");
  const formData = await request.formData();
  let recordData = JSON.parse(formData.get("data")); // formData.get("data");
  console.log(recordData, "recordData");
  const images = formData.getAll("files") as File[];

  //console.log("images",typeof images, images);
  //path to save image in public/uploads/images
  const savePath = path.join("public", "uploads", "images");
  console.log("savePath", savePath);
  let imageUrlArray = recordData.imgurl;
  console.log("imageUrlArray", imageUrlArray);
  //for (let i=0;i<images.length;i++ ){
  for (let image of images) {
    try {
      const buffer = await image.arrayBuffer();
      await fs.writeFileSync(
        path.join(savePath, image.name),
        Buffer.from(buffer, "base64"),
      );
      //add new file path /uploads/images to be able to show on front
      const imgSrcPath = "/uploads/images/" + image.name;
      imageUrlArray.push(imgSrcPath);

      console.log("urlarray", imgSrcPath, imageUrlArray);
    } catch (error) {
      console.log("try Image writting", error);
    }
  }

  recordData = { ...recordData, imgurl: JSON.stringify(imageUrlArray) };

  console.log("recordData-save", recordData);
  try {
    await updateProduct(recordData);
  } catch (error) {
    console.log("updat record fail", error);
  }

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  // console.log("searchParams",searchParams)
  const id = searchParams.get("id");
  // console.log("id",id)
  const res = await getProduct(id);
  // console.log("res",res)
  const product = await JSON.stringify(res);

  //return response.status(200).json(res)
  return Response.json({ res });
  /*   return new Response("res", {
      data:res,
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });*/
}
