import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/api/nextjsApi";
import { getAllProjects_gql } from "@/api/wpApi";
import { Project,ProjectGQL } from "@/types";
import { Metadata } from "next";

export const metadata:Metadata={
  title:'Coating Projects'
}


export default async function Projects() {
  let projects:Project[] =[]
  // projects = await getProject("all");
 // projects = parseProducts(projects);
 try {
   projects = await getAllProjects_gql()
  } catch (err){
    throw new Error (`error getting projects: ${err}`)
  }
 
 console.log(projects, "project page received");

  return (<>
      <div>
        <p className="text-4xl m-4">20 Years with Ceramic Epoxy Coting</p>
      </div>
      <div className="text-xl md:grid  md:grid-cols-2 md:justify-items-center  ">
        
        {projects.map((item:Project, index:any) => {
          return (
            <div 
            className="p-4 mx-auto my-8 md:mx-8 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-3/4 h-64 overflow-hidden
              transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-sky-900 hover:dark:bg-neutral-900 hover:dark:bg-opacity-10"
            key={index}  >
              <div className="h-52 overflow-hidden"> 
              <Link
                href={{
                  pathname: `/projects/${item.title}`,
                  query: { id: item.projectId },
                }}
                scroll={true}
              >
              
                <div className={`mb-3 text-xl md:text-2xl font-semibold`}>
                  <p className=" h-12 m-2">{item.title} -&gt;</p>
                   
                  <p>{item.subtitle} </p>
                </div>
                <div className="relative inline justify-center">
                <Image
                  src={`${item.imgurl[0]}`}
                  alt=""
                  width={200}
                  height={200}
                  className="m-auto"
                />
                </div>
              <p className={`m-0  text-sm overflow-hidden  opacity-50`}>
                {item.description}
              </p>             
              </Link>
              </div>
              <Link
                href={{
                  pathname: `/projects/projectDetails`,
                  query: { id: item.id },
                }}
                scroll={true}
              ></Link>
            </div>
          );
        })}
      </div>
      </>
  );
}
