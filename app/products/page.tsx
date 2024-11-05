import Image from "next/image";
import Link from "next/link";
import  Pagination from "../../components/Pagination";
import { getProduct,getProductSummary } from "api/nextjsApi";
import { parse_title_to_url,parseProducts } from "utils/utils";
import { Cursor, Product } from "../../types";
import { getAllProducts_gql, loadMoreProductsPaginated_gql } from "@/api/wpApi";
import ProductCard from "@/components/productSumaryCard";
import type { Metadata } from "next";
import LoadMore from "@/components/LoadMore";

export const metadata:Metadata ={
  title:'Nex Products'
}

export default async function Products() {
  let products:Product[]=[];
  let pageInfo:Cursor;
  /*try {  
      [products,pageInfo]= await loadMoreProductsPaginated_gql (null);
  // console.log("ProductPage wp products", products,pageInfo)
  
   }catch(err){
     console.error(err)
     throw new Error ("fetching WP_Products error")
   }
*/

/* use nextjs direct query DB */
   let productsArray = null;
try {
    productsArray = await getProductSummary("all");
      if (productsArray) {
        products = parseProducts(productsArray);
        console.log("products", products);
      }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown Error";
        //throw err; //goes to error.js will pop up a error on web. not good
      //call the modal
    //  return (      <Modal info={message} />      );

  }  

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
        {products.map(product => {
          return <div key={product.product_id}>
            <Link
              href={{
                pathname: `./products/${parse_title_to_url(product.title)}`,
                query: { id: product.product_id,title:product.title },
              }}
              scroll={true}
            >

            <ProductCard product={product} key={product.product_id}/>
            </Link>

            <Link href={`products/detail?id=${product.product_id}`}>
              <br />
              <p>try dynmic route laal</p>
              <p>link to {` toto ${product.product_id}`} </p>
            </Link>
          </div> }
        )}

      </div>
        <LoadMore cursor={""
          /*pageInfo.endCursor*/
          } />
      <Pagination  />
    </div>
  );
}
