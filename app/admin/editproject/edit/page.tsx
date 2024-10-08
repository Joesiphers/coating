"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetProjectsSWR } from "../../api/useSWRAPI";
import { parseProducts } from "@/utils/utils";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page({ searchParams}:{searchParams:{id?:string}} ) {
  const [inputState, setInputState] = useState({
    id: "",
    subtitle: "",
    title: "",
    imgurl: [""],
    description: "",
  });
  const [files, setFiles] = useState<
   { name: string; file: Blob; url: string|null|ArrayBuffer } []  >([]);
  const { id } = searchParams;
  const router=useRouter();
  const handleInputChange = (field:string , value:string) => {
    const updateData = { ...inputState, [field]: value };
    setInputState(updateData);
  };
  const handleImageUpload = (e:ChangeEvent<HTMLInputElement>) => {
    //console.log(imgFiles[0], "imgs", files);
    const  imgFiles =e.target.files;
    if ( imgFiles &&  imgFiles.length>0){
          for (let i = 0; i < imgFiles.length; i++) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFiles([
          ...files,
          {
            name: imgFiles[0].name,
            file: imgFiles[0],
            url: fileReader.result,
          },
        ]);
        //  setInputState({ ...inputState, imgurl: updateUrl });
      };
      fileReader.readAsDataURL(imgFiles[i]);
    }
    }
  };
  const handleSave = async () => {
    let formData = new FormData();
    console.log(inputState, files); 
    formData.append("data", JSON.stringify(inputState));
    // console.log("files", files)
    for (const file of files) {
      //append the file only , not include the other attr
      formData.append("files", file.file);

      //the files is a array of files.
    }
    const res = await fetch("../api/projects", {
      method: "POST",
      body: formData,
    }).then((res) => res);
    console.log(res);
  };
  const handleCancel = () => {
    setInputState(parseProducts(data.res)[0]);
    router.back()
  };
  //console.log (id)
  const { data, isLoading, error } = useGetProjectsSWR(
    `../api/projects?id=${id}`,
  );
  useEffect(() => {
    if (data && data.res) {
      console.log(data.res, "data.res");
      const uData = parseProducts(data.res)[0];
      setInputState(uData);
    }
  }, [data]);
  if (isLoading) return <div>Loading</div>;
  //console.log(inputState,data.res[0])
  return (
    <div className="w-5/6 m-auto mt-12">
      <label htmlFor="">Title</label>
      <div>
        {" "}
        <input
          className="w-full border-sky-500 border-2 "
          type="text"
          value={inputState.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />{" "}
      </div>
      <label htmlFor="">Images</label>
      <div>
        <input
          className="w-auto border-sky-500 border-2"
          type="file"
          onChange={(e) => handleImageUpload(e)}
        />
      </div>
      <div className="flex justify-center">
        <p>inputimg</p>
        {//preview image
        
        inputState.imgurl[0] && inputState.imgurl.map((i) => (
          <Image key={i} src={i} alt="img" width={190} height={190} />
        ))}
        {//existing images file
          
          files.map((i) => {
            return (
              <Image
                key={i.name}
                src={i.url}
                alt="img"
                width={210}
                height={210}
              />
            );
          })
        }
      </div>
      <label htmlFor="">Deascription</label>
      <div>
        <textarea
          className="w-full border-sky-500 border-2"
          name=""
          id=""
          cols="30"
          rows="10"
          value={inputState.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></textarea>
      </div>
      <div>
        <Button onClick={handleSave}>Save</Button>{" "}
        <Button onClick={handleCancel}>Cancel</Button>{" "}
      </div>
    </div>
  );
}