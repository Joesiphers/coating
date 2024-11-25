'use client'
import { Pagination } from "@mui/material";

export default function Page ({pages,pageClicked}){

    return <Pagination 
    shape="rounded"
    onClick={(e)=>pageClicked(e.target.innerText)} 
    onChange={(e,page)=>console.log(page)}
    count={pages}
    
    />
}