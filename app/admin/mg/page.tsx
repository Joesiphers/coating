import { getProduct } from "api/gets";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const products = await getProduct("all");
  console.log("products", products);
  /* const url = products[0].imgurl;
  console.log("products", JSON.parse(url), url, typeof url);
  return <>"hello"</>;
}*/

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>SubTitle</th>
            <th>image</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            let cells = [];
            console.log("itemMap", item);
            for (let property in item) {
              if (property === "imgurl") {
                const url = JSON.parse(item.imgurl);
                cells.push(
                  <td className="border-solid border-2 border-indigo-600">
                    {url.map((u, index) => {
                      console.log("url", url, u);
                      return (
                        <Image
                          key={index}
                          src={u}
                          alt="img"
                          width={38}
                          height={38}
                          className="inline"
                        />
                      );
                    })}
                  </td>,
                );
              } else {
                cells.push(
                  <td className="border-solid border-2 border-indigo-600">
                    {item[property]}
                  </td>,
                );
              }
            }

            return (
              <tr key={index}>
                {cells}
                <td className="border-solid border-2 border-indigo-600">
                  <Link
                    href={{
                      pathname: "./edit",
                      query: { /*products: JSON.stringify(products)*/ },
                    }}
                  >
                    <button>edit</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>Add New</button>
      <button>Delete</button>
    </>
  );
}
