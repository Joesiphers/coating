import { getProduct } from "api/nextjsApi";
import {getProduct_gql}from "api/wpApi";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  const { id } = searchParams;
  //const product = await getProduct(id);
  const product=getProduct_gql (id)
  console.log("productdatails", product);
  return <div> {UI(product[0])}</div>;
}
export type ProductDetails = {
  id: number;
  title: string;
  subtitle: string;
  imgurl: string;
  features?: string;
  description: string;
  projectApplication?: string;
};
const UI = (product: ProductDetails) => (
  <>
    <div className="text-4xl p-4">{product.title} </div>
    <div>---- {product.subtitle}: </div>

    <div className="text-xl md:grid md:grid-cols-2 m-4 ">
      <div>
        {JSON.parse(product.imgurl).map((url:string) => (
          <Image
            key={product.imgurl}
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
