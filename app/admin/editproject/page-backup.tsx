"use client"
import { useEffect, useState } from "react"
import { useGetProjectsSWR } from "../api/useSWRAPI"
import Link from "next/link"

//import {parseProducts} from "../../../utils/utils"
const parseProducts = (productsArray:[{}] ) => {
    let productsDataObj = (productsArray);
    //console.log(productsArray)
    let updateData = [];
    for (let i of productsDataObj) {
      updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
      }
  return updateData}

export default function Page (){
    
    const [projects, setProjects]=useState([{id:"",title:"",imgurl:[],description:""}])
    
    const {data, isLoading, error}=useGetProjectsSWR("api/projects?id=all")
    useEffect(()=>{
        if (data && data.res) 
        {
            const parsedProjects=parseProducts(data.res)
        setProjects(parsedProjects)

        }
    },[data])
    if (isLoading) return <div>Loading</div>
    if (error ) return <div>Error</div>

    return (        <div className="grid grid-cols-2">
        {projects.map(i=>{
            return   <div key={i.id} className="border-2 border-gray-5002 rounded-lg m-8 h-80">
                    <div>{i.title} </div>
                    <div className="flex justify-center">{i.imgurl.map(i=> <img key={i} src={i} alt="" width={50} />)}  </div>
                    <div className="truncate">   {i.description} </div>
                    <div>
                    <Link href={{
                            pathname:'editproject/edit',
                            query:{projectid:"i.id"}
                        }}>
                        <button >Edit newPage</button>
                    </Link>
                    </div>
                </div>
        })}
    </div>
    )
}