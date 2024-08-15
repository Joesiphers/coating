import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/api/gets";
import { parseProducts } from "@/utils/utils";
import { Product } from "@/types";


export default async function Projects() {
  let projects = await getProject("all");
  projects = parseProducts(projects);
  console.log(projects, "project page received");

  return (<>
      <div>
        <p className="text-4xl m-4">20 Years with Ceramic Epoxy Coting</p>
      </div>
      <div className="text-xl md:grid gap-8 md:grid-cols-2 m-4 ">
        {projects.map((item:Product, index) => {
          return (
            <div 
            className="p-4 mx-auto my-8 md:mx-2 shadow-xl border-solid border-2 border-slate-300 rounded-md w-3/5 md:w-full h-64 overflow-hidden
              transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            key={index}  >
              <Link
                href={{
                  pathname: `/projects/projectDetails`,
                  query: { id: item.id },
                }}
                scroll={true}
              >
                <div className={`mb-3 text-xl md:text-2xl font-semibold h-16 `}>
                  <p className=" h-12 m-2">{item.title}</p>
                  <p className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </p>
                </div>
                <div className="relative inline justify-center">
                <Image
                  src={`${item.imgurl[0]}`}
                  alt=""
                  width={200}
                  height={200}
                  className="m-auto"
                />
                </div>
              <p className={`m-0  text-sm overflow-hidden  opacity-50`}>
                {item.description}
              </p>              </Link>

            </div>
          );
        })}
      </div>
      </>
  );
}
