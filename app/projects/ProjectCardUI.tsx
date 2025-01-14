import Image from "next/image"
import Link from "next/link"

export function ProjectCardUI ({project}){
    const IMG_URL=process.env.ROOT_URL+'/uploads/images/'
    
return(
    <div 
            className="p-4 h-80 mx-auto my-8 md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-3/4 overflow-hidden
              transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-sky-900 hover:dark:bg-neutral-900 hover:dark:bg-opacity-10"
            >
              <div className="h-52 overflow-hidden"> 
              <Link
                href={{
                  pathname: `/projects/${project.title}`,
                  query: { project_id: project.project_id },
                }}
                scroll={true}
              >
              
                <div className={`mb-3 text-xl md:text-2xl font-semibold`}>
                  <p className=" h-20 m-2">{project.title} -&gt;</p>
                   
                </div>
                <div className="relative inline justify-center">
                <Image
                  src={`${IMG_URL}${project.imgurl[0]}`}
                  alt=""
                  width={150}
                  height={150}
                  className="m-auto"
                />
                </div>
              <p className={`m-0  text-sm overflow-hidden  opacity-50`}>
                {project.description}
              </p>             
              </Link>
              </div>
              <Link
                href={{
                  pathname: `/projects/projectDetails`,
                  query: { id: project.projectId },
                }}
                scroll={true}
              ></Link>
            </div>
            )}