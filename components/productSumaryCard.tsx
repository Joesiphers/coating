import Image from "next/image"
import { Product } from "@/types"
//const img_root_url=process.env.JS_RESTURL+'/uploads/images/'
const img_root_url=process.env.DEV_BACKEND_URL+'/uploads/images/'

export default function ProductCard ({product}:{product:Product} ){
return <div
className="p-4 h-72 mx-auto my-8  md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full
              transition-colors
              hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30
"
key={product.title}
>
  <div className="text-lg font-semibold h-12 m-2">{product.title}</div>
  <div className=" h-20 block m-4 align-middle ">
   {product.imgurl?.[0] &&<Image
      src={img_root_url+`${product.imgurl[0]}`}
      alt=""
      width={100}
      height={100}
      className="m-auto"
    />} 
  </div>
  <div className="overflow-hidden h-12">{product.subtitle}</div>

</div>
}