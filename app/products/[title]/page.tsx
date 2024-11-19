import { getProduct } from "@/api/js-get";
//import {getProduct_gql}from "@/api/wp-api";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import { Product } from "@/types";
import ProductPanel from "@/components/productFeatures";

export async function generateMetadata ({searchParams}:{searchParams: {product_id:string,title:string}} ){
  return {title:searchParams.title}
}
 
export default async function Page({ searchParams,params }: { params: { title: string },searchParams: { product_id: string,title:string} }
  ) {
  const {product_id } = searchParams;
  let product:Product;
    try {
      product=await getProduct(parseInt(product_id)); // with nextjs backend DB  access
      //product.imgurl=JSON.parse(product.imgurl)
     // product=await getProduct_gql (parseInt(id))
      console.log("products/[title] ", product);  //with wrodpress GQL access
      if (!product){
        throw new Error ("fetch product error, return no product")
      }
     //console.log("product[title]", product);
    } catch (err) {
      //console.log("catchErr products[title]",err)
      return <Modal info={"err"}> getProduct Error</Modal>;
    }
    //const str =product.content?product.content.replace(/\n /,''):""

return(  <>
    <div className="text-4xl p-4">{product.title} </div>
    <div className="text-xl text-blue-800 w-3/5 m-auto" > {product.subtitle} </div>

    <div className=" flex justify-center p-4">
      <div className="block md:grid md:grid-cols-2  ">
        {product.imgurl&&product.imgurl.map((url) => (
          <div className="m-4" key={url}>
            <Image
            key={url}
            src={url}
            alt="img"
            width={500}
            height={500}
            className=" rounded-md"
          />
          </div>
          
        ))}
      </div>  
    </div>
    <div className="text-xl p-4 w-5/6 m-auto text-left ">
     <div className="reset-tw indent-8"id='product_content'> 
      {product.content  }

     </div>
     <div className="reset-tw indent-8"id='product_description'> 
      {product.description  }
      
     </div>

    </div>
    <div><ProductPanel product={product}/> </div>
    <div>{"project application cases"}</div>

  </>
)};
