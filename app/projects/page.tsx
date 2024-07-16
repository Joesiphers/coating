import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/api/gets";
import { parseProducts } from "@/utils/utils";


export default async function Projects() {
  let projects = await getProject("all");
  projects = parseProducts(projects);
  console.log(projects, "project page received");

  return (
    <div className="m-8">
      <div>
        <p className="text-4xl m-4">20 Years with Ceramic Epoxy Coting</p>
      </div>
      <div className="mb-32 grid  lg:mb-0 lg:grid-cols-4 text-left">
        {projects.map((item, index) => {
          return (
            <div className="m-4" key={index}>
              <Link
                href={{
                  pathname: `/projects/projectDetails`,
                  query: { id: item.id },
                }}
              >
                <div className={`mb-3 text-2xl font-semibold h-16 `}>
                  <p className="">{item.title}</p>
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </div>
                <div className="relative inline justify-center">
                  {<img src={item.imgurl[0]} alt="img" width={200} />}
                  {/*    {item.imgurl.map(url=>  <Image
                        alt="img"
                        src={url}
                        width={300}
                        height={300}
                        className="inline"
                           />
            )
             }  */}
                </div>
              </Link>
              <p className={`m-0  text-sm overflow-hidden  opacity-50`}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
