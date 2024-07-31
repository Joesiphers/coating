"use client"

export default function Error({error, reset}:{
    error :Error &{digest?:string} 
    reset:()=>{}}){
     console.log ("product error.js" , error.message)
        return ( <>
        <div className="mt-20"> <h1>System Error :</h1>
            <h2>{error.message}</h2></div>
            <button onClick={reset} 
            className="border border-slate-600 rounded px-2"
            >reset</button>
        </> )
    }