import { getProduct } from "api/nextjsApi";
import {getProduct_gql}from "api/wpApi";
import { Product } from "@/types";
import Image from "next/image";
import type { Metadata } from "next";
export async function generateMetadata ({params}:{params: {id:string,title:string}} ) {
  console.log("productDetails SearchParams:", params)
   return {title:params.title}
  
}

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string,title:string};
}) {
  const { id } = searchParams;
  //const product = await getProduct(id); 
  // product.imgurl = JSON.parse(product.imgurl)       
  // DB query with imgurl ="[....]"
  console.log("productDetails SearchParams:", searchParams)
  const product=await getProduct_gql (parseInt(id))
  console.log("productdatails", product);
  return <div> {UI(product)}</div>;
}

const UI = (product: Product) => (
  <>
    <div className="text-4xl p-4">{product.title} </div>
    <div>---- {product.subtitle}: </div>

    <div className="text-xl md:grid md:grid-cols-2 m-4 ">

      <div>
      {//{product.imgurl&&Jproduct.imgurl.map((url:string) => (
      //WP gql wpProductGQLToObj return imgurl as [] 
      }
      
        {product.imgurl&&product.imgurl.map((url:string) => (
          <Image
            key={url}
            src={url}
            alt="img"
            width={500}
            height={500}
            className="inline"
          />
        ))}
      </div>
    </div>
    <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left">
      {product.description}
    </div>
    <div>{"project application cases"}</div>
  </>
);
