"use client"
export default function FileInput ({handleFiles} )
{  return    <input type="file" 
              className="w-auto border-sky-500 border-2"
              onChange={(e)=>handleFiles(e.target.files)}
        
        />
            
            
}