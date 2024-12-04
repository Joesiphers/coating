import Image from "next/image";
import Link from "next/link";
import { getProductSummary,getTotalPages } from "@/app/api/fetch_api";

import { parse_title_to_url} from "utils/utils";
import { Product } from "../../types";
import ProductCard from "@/components/productSumaryCard";
import type { Metadata } from "next";
import NextPagination from "@/components/NextPagination";
export const metadata:Metadata ={
  title:'Nex Products'
}

export default async function Products({searchParams}) {
  const pageNumber=Number((await searchParams).page||1);
  let page_batch=2; //list quantity each page
  const totalPages=( await getTotalPages())
  console.log("products?page=", pageNumber, 'of',totalPages);


  const products =( await getProductSummary(pageNumber)).result;
  //console.log("products?", products);

  return (
    <div className="w-5/6 m-auto ">
      <div className="w-5/6 mx-auto my-4">
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
      <div className="w-10/12 m-auto justify-between my-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-12">
        {products.map(product => {
          return <div key={product.product_id}>
            <Link
              href={{
                pathname: `./products/${parse_title_to_url(product.title)}`,
                query: { product_id: product.product_id,title:product.title },
              }}
              scroll={true}
            >

            <ProductCard product={product} key={product.product_id}/>
            </Link>

            <Link href={`products/detail?product_id=${product.product_id}`}>
              <br />
              <p>try dynmic route laal</p>
              <p>link to {` toto ${product.product_id}`} </p>
            </Link>
          </div> }
        )}

      </div>       

      <NextPagination totalPages={totalPages} currentPage={pageNumber}   />
    </div>
  );
}
