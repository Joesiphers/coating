import { getProduct } from "@/api/js-get";
//import {getProduct_gql}from "@/api/wp-api";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import { Product } from "@/types";
import ProductPanel from "@/components/productFeatures";
const IMG_URL=process.env.ROOT_URL+'/uploads/images/'

export async function generateMetadata ({searchParams}:{searchParams: {product_id:string,title:string}} ){
  const {title}=await searchParams
  return {title:title}
}
 
export default async function Page({ searchParams,params }: { params: { title: string },searchParams: { product_id: string,title:string} }
  ) {
  let product:Product;
  const { product_id,title } = await searchParams;
  console.log("productDetails SearchParams:", product_id,title)

  const query = (!!product_id)?parseInt(product_id):title.trim()
   console.log("productDetails Search query: ",query)
    try {
      product=await getProduct(query); // with nextjs backend DB  access
      console.log("products/[title] ", product);  //with wrodpress GQL access
      if (!product){
        throw new Error ("fetch product error, return no product")
      }
    } catch (err) {
      return <Modal info={`err search:${query}`}> getProduct Error</Modal>;
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
              
            src={IMG_URL+url}
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
