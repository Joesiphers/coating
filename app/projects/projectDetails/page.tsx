import Image from "next/image";
import { getProject } from "api/getAPI";

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
    <div>
      <div className="m-8 text-3xl font-serif">{title}</div>
      <div  className="m-4">{subtitle}</div>
      <div>{JSON.parse(imgurl).map(url=><img key={url} src={url} alt="img"  width={300} className="m-auto"/> )}</div>
      <div className="m-4">{description}</div>
    </div>
  );
}
