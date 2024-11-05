import { getProduct } from "@/api"

export default function EditProduct (product_id){
    getProduct  (product_id)
    return (<>edit</>)
}