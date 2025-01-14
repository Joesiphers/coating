import Image from "next/image";
import { getProductTitleByID } from "@/api/js-get";
import { getProject } from "@/app/api/fetch_api";
import Link from "next/link";

export  const  generateMetadata = async ({params})=> {
  const {title}=await params
    return{ title:title.replace('%20',' ')}
}
const IMG_URL=process.env.ROOT_URL+'/uploads/images/'

export default async function Page({
    searchParams,params}: {params:{title:string} ,   searchParams: { project_id: string };
  }) {
  let project={}
  const {project_id}=await searchParams;

  try {
      project=(await getProject( parseInt(project_id))).result[0]
      console.log("project",project)
  }catch(err){
      throw new Error (`try to fetch project GQL error : ${err}`)
  }
  /*if (project.productsUsed.length>0){
    const productId= project.productsUsed.foreach (await getProductIdByTitle_gql(i))
    }*/
  const { title, subtitle,features,description, imgurl,product_used}=project

  let productsUsedTitleAndId
  try {productsUsedTitleAndId =await getProductTitleByID([1,2] )
    console.log("productsUsedTitleAndId", productsUsedTitleAndId)
  }
  catch(err){
      console.log("get product title by id error", err) 
  }
      return ( <div className="relative text-center m-auto ">
          <div className="text-3xl text-indigo-700 font-bold p-8">
          <p> {title.trim()}</p> 
          </div>

          <div  className="text-2xl"> <span>--- {subtitle} </span> 
          </div>
          <div className=" flex justify-center p-4">
            <div className="block   ">
              {imgurl&&imgurl.map((url) => (
                <div className="m-4" key={url}>
                  <Image
                  key={url}
                  src={IMG_URL+url}
                  alt="img"
                  width={500}
                  height={500}
                  className=" rounded-md"
                />
                </div>
              ))}
            </div>  
          </div>  
      <div className="">
        <p>Features</p> 
        <p>{features}</p>
        </div>  

      <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left ">
        <p>Description :</p>
        {description}
      </div>
      <div>
          <p>Products used </p>
          {
          productsUsedTitleAndId[0]&&productsUsedTitleAndId.map(i=>{
              
              return <Link href={{
                        pathname:`/products/${i.title}`,
                        query:{project_id:i.project_id}
                                }}
                        key={i.project_id}
              >
                  <li>{i.title} {i.project_id} </li>
              </Link>})
            }
              <p>---</p>
          {/*
          products_used?.map(async i=>{
              const {project_id}= await getProduct_gql(i)
              return <div>{i}:{project_id} </div>
            })
              */}
              
          </div>
      </div>  
      
      )
  }