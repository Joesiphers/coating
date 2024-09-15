import Link from "next/link"
import {getPreNextProduct_gql} from '@/api/wpApi'



export default async function Page ({cursor}:{cursor:string} ){
        const{prev, next}= await getPreNextProduct_gql(cursor)

    return (<div className="flex justify-between w-4/5 m-auto">
        {prev?  <Link href={{
            pathname:`/products/${prev.title}`,
            query:{id:prev.productId}
                            }} 
                    className=""
        >
        <button className="px-2 bordered bg-blue-600 rounded text-white"  >{'<<'} Prev Product</button>

        </Link> :
        <button className="px-2 bordered bg-gray-200 rounded text-gray-500" disabled={true} >First Product</button>

        }
        { next ?<Link href={{
            pathname:`/products/${next.title}`,
            query:{id:next.productId}
        }} >
           <button className="px-2 bordered bg-blue-600 rounded text-white"   >Next Product {'>>'}</button>
        </Link>:
        <button  disabled={true} className="px-2 text-gray-500 bordered bg-gray-200"> Last Product </button>

}
        
    </div>)
}