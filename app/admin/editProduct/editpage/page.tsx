//import { getProduct} from "@/api"
import {getProduct } from'@/app/api/fetch_api'
import ClientEditPage from "./ClientEditPage"

    export default async function EditProduct ({searchParams}:{searchParams:Promise<{ [key: string]: string | undefined }>}){
        const {product_id }=(await searchParams)
        if (!product_id) {
            return <>
            <label>Product Title</label> <input type="text" defaultValue={"New product"}  />
             <ClientEditPage product={null}  />
             
         </>}

        const{result} = await getProduct  (parseInt( product_id))

        const product =result[0]//, imgurl: JSON.parse(product_data.imgurl)} ;
             console.log("edit product",result[0] )
    
    return (<>
       <label>Product Title</label> <input type="text" defaultValue={product.title}  />
        <ClientEditPage product={product} />
        
    </>)
}