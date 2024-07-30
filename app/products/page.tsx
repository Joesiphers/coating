import Image from "next/image";
import Link from "next/link";
import { getProduct } from "api/gets";
import {parseProducts} from "utils/utils"
import Modal from "@/components/layout/Modal";

export default async function Products() {
  let productsArray =null;
  try { productsArray = await getProduct("all");
    console.log("Array", productsArray)
  }
  catch(err){
    console.log("no products Array received" ,err)
    const message=err instanceof Error ? err.message : "unknown Error";
    //throw err; 
    //call the modal 
    return <Link href="?modal=true"> <Modal info={message} /></Link>
  }
  let products;
  if (productsArray) { products = parseProducts(productsArray)} 
  return (
    <div className="w-5/6 m-auto ">
      <div className="w-5/6 my-8 mx-auto">
        <p className="text-4xl text-sky-600 m-12">Pre-Coated Pipes</p>

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
      <div className="text-sky-600">Utilise Precision equitment for corrosion proof coating</div>
      <div className="flex justify-between my-12 grid md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            className="m-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full h-64 overflow-hidden
                          transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30

            "
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
