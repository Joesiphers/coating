import { getProject } from "@/api/js-get";
import Link from "next/link";


export default async function Page() {
  const result = await getProject("all");
  const ROOT_URL=process.env.ROOT_URL
  console.log("project Result", result);
 // const products = parseProducts(result);
 const products = result;
  return (
    <div className="grid grid-cols-2">
      {products.map((i) => {
        return (

          <div
            key={i.project_id}
            className="border-2 border-gray-5002 rounded-lg m-8 p-2 h-88"
          >          <Link
          href={{
            pathname: "editproject/edit",
            query: { project_id: i.project_id },
          }}
        >
            <div>{i.title} </div>
            <div className="flex justify-center">
              {i.imgurl.map((i) => (
                <img key={i} src={ROOT_URL+'/uploads/images/'+ i} alt="" width={50} />
              ))}
            </div>
            <div className=" m-auto overflow-hidden p-4 h-60"> {i.description} </div>
            </Link>
          </div>

        );
      })}
    </div>
  );
}
