import { NextRequest, NextResponse } from "next/server";
import { loadMoreProducts} from "@/api/js-get";

export async function GET (request:NextRequest, response:NextResponse) {
    console.log("GET REQUEST")
    const { searchParams } = new URL(request.url);
     console.log("searchParams",searchParams)
     const batch = searchParams.get("batch"); 
    const cursor = searchParams.get("cursor"); 
    console.log("searchParams",searchParams,batch,cursor)
    const products=await loadMoreProducts(parseInt(cursor),parseInt( batch));
    console.log("products3-4", products)
    return new Response(JSON.stringify({products}), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });

    }
   
