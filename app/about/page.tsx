import Link from "next/link";
import type { Metadata } from "next";
export const metadata:Metadata ={
  title:'About next coating'
}

export default function About() {
  return (
    <div>
      <div className="relative top-8 py-8 text-4xl bold">
       <p> Specialist in protecting under extrem condition </p>
      <div className="text-center p-8">

        <div>
        <p className="text-xl">
          For 20 years experience we cooperate with German Cemaric Coating. We
          are the most experienced engineer team in applying
        </p></div></div>
        <p>Strategic partners </p>
        <div className="flex flex-wrap  justify-evenly">
        <div className=" ">         
          <img src="/image/shell.png" width={'100'} height={'100'} alt="Shell" />
          </div>
        <div className=" ">
          <img src="/image/cnooc.png" width={'100'} height={'100'} alt="SinoPec" /> </div>
        <div className=" ">          
           <img src="/image/petrochina.svg" alt="Petro China" width={'100'} height={'100'} />
          </div>
        <div>
        <img src="/image/esso.png" alt="Esso oil" width={'100'} height={'100'} />
        </div>    
        </div>
      </div>
    </div>
  );
}
