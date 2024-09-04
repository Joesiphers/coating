import Image from "next/image";
import Link from "next/link";
import { getProject } from "api/nextjsApi";
import { getProject_gql , getProduct_gql} from "@/api/wpApi";
import Scroll from "@/utils/scrollToTop"

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = searchParams;
 // console.log("id,", id);
 let project;
 try {
  //project = await getProject(parseInt(id));
  project = await getProject_gql(parseInt(id));
  
 }catch (err){
  throw new Error (`error getting projects: ${err}`)
} 
  const { title, subtitle, description, imgurl,features,productsUsed } = project;
 

  return (
    <>
    <Scroll/>
      <div className=" text-4xl p-4 font-serif">{title}</div>
      <div  className="m-4">----- {subtitle}</div>
      <div  className="relative ml-8 text-left">Features ----- {features?.map(i=><div className="text-xl left-8">{i}</div> ) }</div>
      <div className="text-xl ">
      {imgurl.map((url:string)=>{
        return <div key={url}>
        <img  src={url} alt="img"  width={300} className="py-8 m-auto"/> 
        </div>
        })
      }

      </div>
      <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left">
        {description}
      </div>
      <div>
        <Link href={{
          pathname:''
        }}>
         products used :{productsUsed}
       </Link>
      </div>
   </>
  );
}
