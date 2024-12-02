'use client'
import { Pagination } from "@mui/material";

export default function Page (){

    return <Pagination 
    shape="rounded"
    onClick={(e)=>console.log(e.target.innerText)} 
    onChange={(e,page)=>console.log(page)}
    count={10}
    
    />
}