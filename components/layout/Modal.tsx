"use client"

import { useSearchParams,usePathname,useRouter } from "next/navigation"
import Link from "next/link"
//import Login from "@/app/login/page";
//
export default function Modal (props){
    console.log("MOdal called", props)
    const searchParams=useSearchParams()
    const modal=searchParams.get("modal")
    const message=searchParams.get("message")
    const content= searchParams.get("content")
    const pathName=usePathname()
    const router=useRouter()

console.log(searchParams,modal, message,content,pathName)
  //  if (!modal){return null}
    return (<div className="w-6/12 m-auto border rounded py-4 h-fit my-8 
        absolute top-12 left-2/4 translate-x-[-50%]
        f text-white z-10
        bg-slate-600/[0.6]
    ">
               
        <div className="relative text-right pr-4 text-2xl">
             <Link href={pathName}  >
             <button onClick={()=>router.back()}>
            X</button>
            </Link>
            </div>

        <div className="m-4"> Attention : {props.info }{message} </div>
        <div className="w-3/4 overflow-auto m-auto"       >
        {props.children}
        {/**the above use Modal to wrap a component need to present */}
            {/*content=="login"?<Login />:null*/}
            {/**the above use params query to present login page */} 
        </div>
        <Link href={pathName}  >
        <div className="text-center mt-6">
            <button onClick={()=>{router.back()}}>
            Close</button>
            </div>
        </Link>
        </div>
    )
}

/**
        <props.child/>

*/