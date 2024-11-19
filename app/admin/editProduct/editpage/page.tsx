import { getProduct} from "@/api"
import EditPageUI from "./editClientPage"
    export default async function EditProduct ({searchParams}:{searchParams:Promise<{ [key: string]: string | undefined }>}){
        const {product_id }=(await searchParams)
        if (!product_id) {
            return <>
            <label>Product Title</label> <input type="text" defaultValue={"New product"}  />
             <EditPageUI product={null}  />
             
         </>}

        const product_data = await getProduct  (parseInt( product_id))
        //console.log("edit product",product_data)

        const product ={...product_data}//, imgurl: JSON.parse(product_data.imgurl)} ;
         
    return (<>
       <label>Product Title</label> <input type="text" defaultValue={product.title}  />
        <EditPageUI product={product} />
        
    </>)
}