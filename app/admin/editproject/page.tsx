import { getProject } from "@/api/getAPI";
import Link from "next/link";

import { parseProducts } from "utils/utils";

export default async function Page() {
  const result = await getProject("all");
  console.log("project Result", result);
  const products = parseProducts(result);
  return (
    <div className="grid grid-cols-2">
      {products.map((i) => {
        return (
          <div
            key={i.id}
            className="border-2 border-gray-5002 rounded-lg m-8 h-80"
          >
            <div>{i.title} </div>
            <div className="flex justify-center">
              {i.imgurl.map((i) => (
                <img key={i} src={i} alt="" width={50} />
              ))}{" "}
            </div>
            <div className="truncate"> {i.description} </div>
            <div>
              <Link
                href={{
                  pathname: "editproject/edit",
                  query: { id: i.id },
                }}
              >
                <button>Edit newPage</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
