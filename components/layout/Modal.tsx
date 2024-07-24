"use client"

import { useSearchParams,usePathname } from "next/navigation"
import Link from "next/link"
import Login from "@/app/admin/login/page";

export default function Modal (props){
    console.log("MOdal called", props)
    const searchParams=useSearchParams()
    const modal=searchParams.get("modal")
    const message=searchParams.get("message")
    const content= searchParams.get("content")
    const pathName=usePathname()
console.log(searchParams,modal, message,content)
    if (!modal){return null}
    return (<div className="w-6/12 m-auto border rounded py-12 h-[60vh] my-8 
        absolute top-12 left-2/4 translate-x-[-50%]
        f text-white z-10
        bg-slate-600/[0.6]
    ">
        <div className="m-4"> Attention : {props.info }{message} </div>
        <div className="w-3/4 overflow-auto m-auto"       >
        {props.children}
            {content=="login"?<Login />:null} 
        </div>
        <Link href={pathName}  >
        <div className="text-center mt-6">
            <button onClick={()=>{console.log(pathName)}}>
            Close</button>
            </div>
        </Link>
        </div>
    )
}

/**
        <props.child/>

*/