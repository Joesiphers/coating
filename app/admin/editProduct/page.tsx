import Link from "next/link";
import  Pagination from "@/components/NextPagination";
//import { getProduct,getProductSummary } from "@/api/js-get";
import {getTotalPages, getProductSummary } from "@/app/api/fetch_api";
import { parse_title_to_url,parseProducts } from "utils/utils";
import { Cursor, Product } from "@/types";
//import { getAllProducts_gql, loadMoreProductsPaginated_gql } from "@/api/wpApi";
import ProductCard from "@/components/productSumaryCard";


export default async function Products( {searchParams}) {
  const pageNumber=((await searchParams).page||1);
  let page_batch=2; //list quantity each page
  const totalPages=( await getTotalPages())

  let products:Product[]=[];
try {
    const {result }= await getProductSummary("all");

    console.log("productsArr", result); 

    products=result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown Error";
        //throw err; //goes to error.js will pop up a error on web. not good
      //call the modal
    //  return (      <Modal info={message} />      );

  }  

  return (
    <div className="w-5/6 m-auto ">

      <div className="text-sky-600">
        Refresh Products
      </div>
      <div className=" justify-between my-12 md:grid md:grid-cols-2 md:gap-6">
        {products.map((product) => {
         return <div key={product.product_id}>
                  <Link href={{
                    pathname:' editProduct/editPage',
                    query:{product_id:product.product_id}
                    }}> 
                    <ProductCard product={product} />
                  
                    <button>EDIT</button>

                  </Link>

         </div>
        })}
      </div>

      <Link href={{
                    pathname:' editProduct/editPage',
                    query:{product_id:null}
                    }}> 
                    <button>Add New</button>

      </Link>          
      <Pagination totalPages={totalPages} currentPage={pageNumber}    />
    </div>
  );
}
