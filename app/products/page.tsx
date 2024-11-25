import Image from "next/image";
import Link from "next/link";
import  Pagination from "../../components/MUIPagination";
//import { getProductSummary,getPages } from "@/api/js-get";
import { getProductSummary,getPages } from "@/app/api/fetch_api";

import { parse_title_to_url} from "utils/utils";
import { Product } from "../../types";
import ProductCard from "@/components/productSumaryCard";
import type { Metadata } from "next";
import LoadMore from "@/components/LoadMore";
import NextPagination from "@/components/NextPagination";
export const metadata:Metadata ={
  title:'Nex Products'
}

export default async function Products({searchParams}) {
  const pageNumber=((await searchParams).page||1);
  let page_batch=2; //list quantity each page
  const totalcount=( await getPages()).total_count
  console.log (typeof parseInt( totalcount))

  const totalPages=Math.round (parseInt(totalcount)/page_batch)
  console.log("products?page=", pageNumber);


  const products = await getProductSummary(pageNumber);
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

      </div>        <LoadMore cursor={cursor} batch={batch} />

      <NextPagination totalPages={totalPages} currentPage={page}   />
    </div>
  );
}
