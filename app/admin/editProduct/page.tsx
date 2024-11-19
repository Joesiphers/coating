import Link from "next/link";
import  Pagination from "@/components/Pagination";
import { getProduct,getProductSummary } from "@/api/js-get";
import { parse_title_to_url,parseProducts } from "utils/utils";
import { Cursor, Product } from "@/types";
//import { getAllProducts_gql, loadMoreProductsPaginated_gql } from "@/api/wpApi";
import ProductCard from "@/components/productSumaryCard";
import LoadMore from "@/components/LoadMore";


export default async function Products() {

  let products:Product[]=[];
  //let pageInfo:Cursor;
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
    /*console.log("productsfetch");  
    productsArray = await fetch(
      `http://localhost:3000/admin/api/products?product_id=all`, {
      method: "GET",
      }
   )
      */
    console.log("productsArr", productsArray); 
    /*
    if (productsArray) {
        products = parseProducts(productsArray);
        console.log("products", products);
      }
        */
    products=productsArray;
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
      <Pagination  />
    </div>
  );
}
