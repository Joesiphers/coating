import Image from "next/image";
import { getProject } from "api/nextjsApi";
import Scroll from "@/utils/scrollToTop"
import { getProject_gql,getProductIdByTitle_gql ,getProduct_gql} from "@/api/wpApi";
import Link from "next/link";

export  const  generateMetadata = async ({params})=> {
    return{ title:params.title.replace('%20',' ')}
}

export default async function Page({
  searchParams,params}: {params:{title:string} ,   searchParams: { id: string };
}) {
let project={}
const {id}=searchParams;

try {
    project=await getProject_gql( parseInt(id))
    console.log("project",project)
}catch(err){
    throw new Error (`try to fetch project GQL error : ${err}`)
}
/*if (project.productsUsed.length>0){
   const productId= project.productsUsed.foreach (await getProductIdByTitle_gql(i))
  }*/
const { title, subtitle,features,description, imgurl,productsUsed}=project

const productsInvoledTitleAndId =await getProductIdByTitle_gql(productsUsed)


    return (<>
        <div className="relative left-1/4 text-left">
            
        
        <div className="text-2xl ">Project {title.trim()}</div>

        <div  className="text-xl"> --- {subtitle} </div>
        <ul className="">Features</ul>
        {features.map(i=>
            <li key={i} className="" >{i}</li>
        )}</div>
        <div className=" flex justify-center p-4">
      <div className="block md:grid md:grid-cols-2  ">
        {imgurl&&imgurl.map((url) => (
          <div className="m-4">
            <Image
            key={url}
            src={url}
            alt="img"
            width={500}
            height={500}
            className=" rounded-md"
          />
          </div>
          
        ))}
      </div>  

    </div>
    <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left ">
      <p>Description :</p>
      {description}
    </div>
    <div>
        <p>Products usded </p>
        {productsInvoledTitleAndId[0]&&productsInvoledTitleAndId.map(i=>{
            
            return <Link href={{
                pathname:`/products/${i.title}`,
                query:{id:i.id}
            }}>
                <li>{i.title} {i.id} </li>
            </Link>})
          }
            <p>---</p>
        {productsUsed.map(async i=>{
            const {id}= await getProduct_gql(i)
            return <div>{i}:{id} </div>
          })}
            
        </div>
    </>
    )
}