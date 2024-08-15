import { getProduct } from "api/gets";
import Modal from "@/components/layout/Modal";
import Image from "next/image";

export type ProductDetails = {
    id: number;
    title: string;
    subtitle: string;
    imgurl: string;
    features?: string;
    description: string;
    projectApplication?: string;
  };
export default async function Page({ searchParams,params }: { params: { slug: string },searchParams: { id: string} }
  ) {
  //console.log("slug prarams", params, "searchParams", searchParams);
  const { id } = searchParams;
  let productdatails;
    try {
      productdatails=await getProduct(parseInt(id));
    } catch (err) {
      return <Modal info={err}>test getProduct Error</Modal>;
    }
  
  const res=productdatails[0]
    //console.log("[slug] productdatails", productdatails, parseInt(id),res, typeof(id), );
return(  <>
    <div className="text-4xl p-4">{res.title} </div>
    <div>---- {res.subtitle}: </div>

    <div className="text-xl flex justify-center">
      <div>
        {JSON.parse(res.imgurl).map((url) => (
          <Image
            key={url}
            src={url}
            alt="img"
            width={500}
            height={500}
            className="inline py-4"
          />
        ))}
      </div>  
    </div>
    <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left">
      {res.description}
    </div>
    <div>{"project application cases"}</div>
  </>
)};
