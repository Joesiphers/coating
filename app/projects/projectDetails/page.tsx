import Image from "next/image";
import { getProject } from "api/gets";
import Scroll from "@/utils/scrollToTop"

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = searchParams;
 // console.log("id,", id);
  const project = await getProject(parseInt(id));
  const { title, subtitle, description, imgurl } = project[0];
  //console.log(searchParams, "project is", title);

  return (
    <>
    <Scroll/>
      <div className=" text-4xl p-4 font-serif">{title}</div>
      <div  className="m-4">----- {subtitle}</div>
      <div className="text-xl md:grid md:grid-cols-2 m-4 ">
      {JSON.parse(imgurl).map((url:string)=><img key={url} src={url} alt="img"  width={300} className="m-auto"/> )}
        </div>
        <div className="text-xl p-4 w-5/6 m-auto whitespace-pre-line text-left">
        {description}
        </div>
    </>
  );
}
