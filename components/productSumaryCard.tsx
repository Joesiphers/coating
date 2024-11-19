import Image from "next/image"
import { Product } from "@/types"

export default function ProductCard ({product}:{product:Product} ){
return <div
className="p-4 mx-auto my-8 md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full h-64 overflow-hidden
              transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30
"
key={product.title}
>
  <div className=" h-12 m-2">{product.title}</div>
  <div className=" h-20 block align-middle ">
   {product.imgurl?.[0] &&<Image
      src={`${product.imgurl[0]}`}
      alt=""
      width={50}
      height={50}
      className="m-auto"
    />} 
  </div>
  <p>{product.subtitle}</p>

</div>
}