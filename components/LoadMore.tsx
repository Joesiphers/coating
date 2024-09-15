'use client'

import { loadMoreProductsPaginated_gql } from "@/api/wpApi"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { parse_title_to_url } from "utils/utils";
import { Product } from "@/types"


export default function LoadMore({cursor}:{cursor:{hasNextPage: boolean, endCursor:string }} ){
    console.log('Load More init cursors',cursor)
    const [moreProducts, setMoreProducts]=useState<Product[]|[]> ([] )
    const [hasMorePage,setHasMorePage]=useState(true)
    const [startCursor, setStartCursor]=useState(cursor)
    const loadmore=async ()=>{
        
        const [products,nextcursors] =await loadMoreProductsPaginated_gql(startCursor)
        console.log('22cursors',startCursor,products,moreProducts)
        setMoreProducts(moreProducts.concat(products))
        setHasMorePage(nextcursors.hasNextPage)
        setStartCursor(nextcursors.endCursor)
    }
    return <div className=" justify-between my-12 md:grid md:grid-cols-2 md:gap-6"> 
            {moreProducts && moreProducts.map((product, index) => (
          <div
            className="p-4 mx-auto my-8 md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full h-64 overflow-hidden
                          transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30
            "
            key={index}
          >
            <Link
              href={{
                pathname: `./products/${parse_title_to_url(product.title)}`,
                query: { id: product.productId },
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
        <button 
            onClick={loadmore} disabled={!hasMorePage}
            >
            {hasMorePage?"Load More":"The End"}</button>
    
    </div>
}