import { ProjectCardUI } from "./ProjectCardUI";
//import { getProjectSummary } from "@/api";
import { getProjectSummary,getProjectTotalPages } from "@/app/api/fetch_api";
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
   projects = await getProjectSummary()
  } catch (err){
    throw new Error (`error getting projects: ${err}`)
  }
 
 console.log(projects, "project page received");

  return (<>
      <div>
        <p className="text-4xl m-4">20 Years with Ceramic Epoxy Coting</p>
      </div>
      <div className="text-xl p-4 w-11/12 m-auto md:grid  md:grid-cols-2 md:justify-items-center  ">
        
        {projects.map((item:Project, index:any) => {
          return ( <ProjectCardUI project={item} key={item.title}/>
            
          );
        })}
      </div>
      </>
  );
}
