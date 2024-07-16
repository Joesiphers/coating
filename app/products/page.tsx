import Image from "next/image";
import Link from "next/link";
import { getProduct } from "api/getAPI";

export default async function Products() {
  let productsArray = await getProduct("all");
  const parseProducts = (productsArray) => {
    let productsDataObj = productsArray;
    console.log("productARR",productsArray)
    let updateData = [];
    for (let i of productsDataObj) {
      updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
    }
    return updateData;
  };
  const products = parseProducts(productsArray);
  // products.map((item) => console.log(item));
  console.log("productsPage", products);
  return (
    <div className="w-5/6 m-auto">
      <div className="w-5/6 my-8 mx-auto">
        <p className="text-4xl m-4">Pre-Coated Pipes</p>

        <Image
          src="/image/coatedpipes.jpg"
          alt="coated pips"
          fill={true}
          style={{
            objectFit: "contain",
            position: "",
          }}
          className=""
        />
      </div>
      <div className="flex justify-between mt-4 grid grid-cols-4 gap-2">
        {products.map((product, index) => (
          <div
            className="m-2  shadow border-solid border-2 border-slate-300 rounded-md "
            key={index}
          >
            <Link
              href={{
                pathname: `./products/detail`,
                query: { id: product.id },
              }}
            >
              <div className=" h-12 m-2">{product.title}</div>
              <div className=" h-20 blokc align-middle">
                <Image
                  src={`${product.imgurl[0]}`}
                  alt=""
                  width={50}
                  height={50}
                  className="m-auto"
                />
              </div>
              <p>{product.subtitle}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
