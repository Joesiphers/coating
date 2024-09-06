import { getProduct } from "api/nextjsApi";
import {getProduct_gql}from "api/wpApi";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import { Product } from "@/types";
import ProductPanel from "@/components/productFeatures";

export async function generateMetadata ({searchParams}:{searchParams: {id:string,title:string}} ){
  return {title:searchParams.title}
}

export default async function Page({ searchParams,params }: { params: { title: string },searchParams: { id: string,title:string} }
  ) {
  const { id } = searchParams;
  let product;
    try {
      //product=await getProduct(parseInt(id)); // with nextjs backend DB  access
      //product.imgurl=JSON.parse(product.imgurl)
      product=await getProduct_gql (parseInt(id))  //with wrodpress GQL access
      if (!product){
        throw new Error ("fetch product error, return no product")
      }
     //console.log("product[title]", product);
    } catch (err) {
      console.log("catchErr products[title]",err)
      return <Modal info={"err"}> getProduct Error</Modal>;
    }
    
return(  <>
    <div className="text-4xl p-4">{product.title} </div>
    <div className="text-2xl relative left-1/4 text-left" > {product.subtitle} </div>

    <div className=" flex justify-center p-4">
      <div className="block md:grid md:grid-cols-2  ">
        {product.imgurl&&product.imgurl.map((url) => (
          <div className="m-4">
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
    <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left ">
      {product.description}
    </div>
    <div><ProductPanel product={product}></ProductPanel> </div>
    <div>{"project application cases"}</div>
  </>
)};
