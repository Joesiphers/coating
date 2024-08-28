import { updateProduct } from "@/api/updates";
import { getProduct } from "api/nextjsApi";

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path";

 type requestData ={
  id:string,
  

}

export async function POST(request:NextRequest) {
  console.log("req");
  //const req = fileUpload.array("files");
  const formData = await request.formData();
  let recordData 
  let images:File; // formData.get("data");
  if (formData){
    const data =(formData.get("data")); // formData.get("data");
    data? recordData = JSON.parse(data):null
 
  console.log(recordData, "recordData");
   images = formData.getAll("files");
 }
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
      fs.writeFileSync(
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
export async function GET(request:NextRequest, response:NextResponse) {
  const { searchParams } = new URL(request.url);
  // console.log("searchParams",searchParams)
  const id = searchParams.get("id");
  // console.log("id",id)
  if (id){
 try { const res = await getProduct(id);
  // console.log("res",res)
  const product = JSON.stringify(res);
  return Response.json({ res });

}catch(err){
  throw new Error("product Route handler Eror")
}
}else {throw new Error (`Product Route Handler error with no id found`)}
  //return response.status(200).json(res)
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
