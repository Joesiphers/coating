import { Product } from "@/types";
import {Tab, TabGroup,TabList, TabPanel, TabPanels}from '@headlessui/react'

export default function ProductPanel ({product}:{product:Product})
    {

    const tabContentArray =['features','productDesigned','productApplication','certificates']
    console.log ('product festures',product.features)
    const tabs =['Features','Tech Designed','Application','Certificates']
    const tabContent=tabContentArray.map(i=>
            {return <TabPanel key={i} className=' w-full bg-gray-200/[0.8] py-4 h-[30rem]'>
            {product[i].map(j=> 
                j instanceof Array ? 
                <div key={j} className="text-left py-2">
                                <li className="text-lg " >{j[0]}</li>
                                {j[1].map(k=> <p key={k} className="pl-8">---{k}</p> )}
                </div>
                    
                : j&&<li className="text-left text-lg" key={j} > {j}</li> 
            )
            }
            </TabPanel>
            }
        )


return <>

        <TabGroup className=" w-5/6 m-auto pt-12 px-2">
            <TabList className={' w-full bg-gray-200/[0.8] pb-1 border-b-4 border-sky-600'} >
            {tabs.map(i=> <Tab key={i} className={'p-3  text-blue-600 rounded hover:bg-blue-500/[0.92]  hover:text-white data-[selected]:bg-blue-600 data-[selected]:text-white '}
            > {i}</Tab>)}
        </TabList>
        <TabPanels >
            {tabContent}
        </TabPanels>
        </TabGroup>
</>
    }

