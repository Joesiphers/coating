import Image from "next/image";
import Link from "next/link";
import { getProduct } from "api/gets";
import {parseProducts} from "utils/utils"
import Modal from "@/components/layout/Modal";

export default async function Products() {
  let productsArray =null;
  try { const array = await getProduct("all");
    console.log("Array", array)
  }
  catch(err){
    console.log("no products Array received" ,err)
    const message=err instanceof Error ? err.message : "unknown Error";
    //throw err;
    return <Modal info={message}  />
  }
  let products;
  if (productsArray) { products = parseProducts(productsArray)} 
  return (
    <div className="w-5/6 m-auto">
      <div className="w-5/6 my-8 mx-auto">
        <p className="text-4xl m-12">Pre-Coated Pipes</p>

        <Image
          src="/image/coatedpipes.jpg"
          alt="coated pips"
          fill={true}
          style={{
            objectFit: "contain",
            position: "",
          }}
          className="rounded"
        />
      </div>
      <div className="flex justify-between mt-4 grid grid-cols-4 gap-2">
        {products.map((product, index) => (
          <div
            className="m-2  shadow border-solid border-2 border-slate-300 rounded-md "
            key={index}
          >
            <Link
              href={{
                pathname: `./products/detail`,
                query: { id: product.id },
              }}
            >
              <div className=" h-12 m-2">{product.title}</div>
              <div className=" h-20 blokc align-middle">
                <Image
                  src={`${product.imgurl[0]}`}
                  alt=""
                  width={50}
                  height={50}
                  className="m-auto"
                />
              </div>
              <p>{product.subtitle}</p>
            </Link>
            <Link href={`products/${product.id}`}>
            <br />
             <p>try dynmic route</p>
            <p>link to {` toto ${product.id}`} </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
