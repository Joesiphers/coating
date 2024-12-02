import Image from "next/image";
import Link from "next/link";
import  Pagination from "../../components/Pagination";
import { getProduct,getProductSummary } from "api/nextjsApi";
import { parse_title_to_url } from "utils/utils";
import { Cursor, Product } from "../../types";
import { getAllProducts_gql, loadMoreProductsPaginated_gql } from "@/api/wpApi";
import type { Metadata } from "next";
import LoadMore from "@/components/LoadMore";

export const metadata:Metadata ={
  title:'Nex Products'
}

export default async function Products() {
  let products:Product[]=[];
  let pageInfo:Cursor;
  try {  
      [products,pageInfo]= await loadMoreProductsPaginated_gql (null);
  // console.log("ProductPage wp products", products,pageInfo)
  
   }catch(err){
     console.error(err)
     throw new Error ("fetching WP_Products error")
   }

  /*try {  
     products= await getAllProducts_gql ();
  }catch(err){
    console.error(err)
    throw new Error ("fetching WP_Products error")
  }*/

/* use nextjs direct query DB 
   let productsArray = null;
try {
    productsArray = await getProductSummary("all");
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown Error";
        //throw err; //goes to error.js will pop up a error on web. not good
      //call the modal
    //  return (      <Modal info={message} />      );
      if (productsArray) {
        products = parseProducts(productsArray);
      }
//  }
  */

  return (
    <div className="w-5/6 m-auto ">
      <div className="w-5/6 mx-auto">
        <p className="text-4xl text-sky-600 mb-4">Pre-Coated Pipes</p>

        <Image
          src="/image/coatedpipes.jpg"
          alt="coated pips"
          fill={true}
          style={{
            objectFit: "contain",
            position:'',
          }}
          className="rounded"
        />
      </div>
      <div className="text-sky-600">
        Utilise Precision equitment for corrosion proof coating
      </div>
      <div className=" justify-between my-12 md:grid md:grid-cols-2 md:gap-6">
        {products.map((product, index) => (
          <div
            className="p-4 mx-auto my-8 md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full h-64 overflow-hidden
                          transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30
            "
            key={index}
          >
            <Link
              href={{
                pathname: `./products/${parse_title_to_url(product.title)}`,
                query: { id: product.productId,title:product.title },
              }}
              scroll={true}
            >
              <div className=" h-12 m-2">{product.title}</div>
              <div className=" h-20 block align-middle ">
               {product.imgurl[0] &&<Image
                  src={`${product.imgurl[0]}`}
                  alt=""
                  width={50}
                  height={50}
                  className="m-auto"
                />} 
              </div>
              <p>{product.subtitle}</p>
            </Link>
            <Link href={`products/detail?id=${product.productId}`}>
              <br />
              <p>try dynmic route</p>
              <p>link to {` toto ${product.productId}`} </p>
            </Link>
          </div>
        ))}
      </div>
        <LoadMore cursor={pageInfo.endCursor} />
      <Pagination  />
    </div>
  );
}
