import {getProject}from '@/app/api/fetch_api'
import ClientEditPage from './ClientEditPage'

export default async function Page({ searchParams}:{searchParams:{project_id?:string}} ) {
  
  const {project_id}= await searchParams;
  console.log("project_id",project_id)
  const project= (await getProject(project_id)).result[0]
  console.log("project", project)
  return <ClientEditPage project={project}/>
}
