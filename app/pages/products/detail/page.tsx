import { getProduct } from "api/getAPI";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: { id: number };
}) {
  //const res = getProduct(params);
  const { id } = searchParams;
  const res = await getProduct(id);
  console.log("productdatails", res);
  return <div> {UI(res[0])}</div>;
}
export type ProductDetails = {
  id: number;
  title: string;
  subtitle: string;
  imgurl: string;
  features?: string;
  description: string;
  projectApplication?: string;
};
const UI = (res: ProductDetails) => (
  <>
    <div className="text-4xl p-4">{res.title} </div>
    <div>---- {res.subtitle}: </div>

    <div className="text-xl md:grid md:grid-cols-2 m-4 ">
      <div>
        {JSON.parse(res.imgurl).map((url) => (
          <Image
            key={res.imgurl}
            src={url}
            alt="img"
            width={500}
            height={500}
            className="inline"
          />
        ))}
      </div>
    </div>
    <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left">
      {res.description}
    </div>
    <div>{"project application cases"}</div>
  </>
);
