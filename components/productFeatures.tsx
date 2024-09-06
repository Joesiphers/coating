import { Product } from "@/types";
import {Tab, TabGroup,TabList, TabPanel, TabPanels}from '@headlessui/react'
import { features } from "process";

export default function ProductPanel ({product}:{product:Product})
    {
    const tabContentArray =['features','productDesigned','productApplication','certificates']
    console.log ('product festures',product)
    const tabs =['Features','Tech Designed','Application','Certificates']
    const tabContent=tabContentArray.map(i=>
        {return <TabPanel className=' w-full bg-gray-200/[0.8] py-4'>
            {product[i].map(j=>typeof j==='string'?
            <li className="text-left" key={j} > {j}</li> 

            :<div key={j[0]} className="text-left py-2">
                        <li className="text-lg " >{j[0]}</li> 
                        <p className="pl-8">---{j[1]}</p>   
                     </div>

            )}
            </TabPanel>

        }
        )


return <>

        <TabGroup className=" w-5/6 m-auto pt-12 px-2">
            <TabList className={' w-full bg-gray-200/[0.8]  border-b-4 border-sky-600'} >
            {tabs.map(i=> <Tab className={'p-3  text-blue-600 rounded hover:bg-blue-500/[0.92]  hover:text-white data-[selected]:bg-blue-600 data-[selected]:text-white '}
            > {i}</Tab>)}
        </TabList>
        <TabPanels>
            {tabContent}
        </TabPanels>
        </TabGroup>
</>
    }

