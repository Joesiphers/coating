"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";


const parseProducts = (productsArray) => {
  let productsDataObj = productsArray;
  let updateData = [];
  for (let i of productsDataObj) {
    updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
  }
  console.log("updateData", updateData);

  return updateData[0];
};
const tdcss = "border-solid border-2 border-indigo-600 flex";
const EditPage = ({ searchParams }) => {
  const { id } = searchParams;
  // console.log(searchParams, id, `api/products?id=${id}`, "searching");

  const [item, setItem] = useState( {id:0,title:"",subtitle:"",imgurl:[],description:""});
  const [files, setFiles] = useState<
    { id: number; file: File | null; url: string | ArrayBuffer | null }[]
  >([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `/admin/api/products?id=${id}`,
    fetcher,
  );
  //console.log(data, isLoading, error)
  useEffect(() => {
    if (data && data.res) {
      setItem(parseProducts(data.res));
    }
  }, [data]);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  
  const handleCancel = () => {
   setItem(parseProducts(data.res))
  };

  const handleSave = async (id) => {
    const toSaveData = item;
    const toAddFiles = Object.values(files).filter((item) => item.id === id);
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(toSaveData));
    for (let i = 0; i < toAddFiles.length; i++) {
      formdata.append("files", toAddFiles[i].file);
    }
    console.log("tosave", toSaveData, toAddFiles);
    const response = await fetch(`/admin/api/products?`, {
      method: "POST",
      body: formdata,
    }).then((res) => res.text());
    console.log("response", JSON.stringify(response));
    // Implement logic to save changes to the backend or update state as needed
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = { ...item, [field]: value };
   // console.log(updatedData,field,value, "handleinput")
    setItem(updatedData);
  };
  const handleImageUpload = (e, id) => {
    const choosedFiles = e.target.files;
    console.log("files seee5", e);
    for (let i = 0; i < choosedFiles.length; i++) {
      const fileReader = new FileReader();
      const file = choosedFiles[i];
      fileReader.onload = () => {
        setFiles((prevFiles) => [
          ...prevFiles,
          { id, file, url: fileReader.result },
        ]);
      };
      fileReader.readAsDataURL(file);
    }
    console.log("files", files);
  };
  const handleDeleteImage = (id, url) => {
    const updateFiles = files.filter((item) => {
      return item.url !== url;
    });
    //delete the just upload but not saved images
    setFiles(updateFiles);
    //delete the existing images
    const deleteExistingImage=(item)=>{
      let newImgurl=item.imgurl.filter(i=>i!==url)
      setItem({...item, imgurl:newImgurl})
      console.log("deleteImage", url, newImgurl,{...item, imgurl:newImgurl} )
    }
    deleteExistingImage(item)
  };
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setItem(updatedData);
  };

  
  return (
    <div className="p-8" >
      <div className={tdcss}>
        <label className="w-1/4" >ID</label>
        <div  className="w-full border-solid border-1 border-indigo-300 ">{item.id}</div>
      </div>
      <div className={tdcss} >
        <label className="w-1/4">Title</label>
        <input
          className="w-full border-solid border-2 border-indigo-300"
          type="text"
          value={item.title}
          onChange={(e) => handleInputChange(item.id, "title", e.target.value)}
        />
      </div>

      <div className={tdcss}>
      <label className="w-1/4">SubTitle</label>

        <textarea
          className="w-full border-solid border-2 border-indigo-300"
          value={item.subtitle}
          rows={3}

          onChange={(e) =>
            handleInputChange(item.id, "subtitle", e.target.value)
          }
        />
      </div>
      <div className={tdcss}>
        <label className="w-1/4">Images</label>
          <span className="w-full border-solid border-2 border-indigo-300">
        <input
          className=" "
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e, item.id)}
        />
        {files[0] &&
          files.map(
            (i, index) =>
              item.id === i.id && (
                <span key={i.name + index}>
                  <Image
                    src={i.url}
                    alt="img"
                    width={38}
                    height={38}
                    className="inline"
                  />
                  <button onClick={() => handleDeleteImage(i.id, i.url)}>
                    Del
                  </button>
                </span>
              ),
              )}
        {item.imgurl.map((url, index) => (
          <span key={index}>
            <Image
              src={url}
              alt="img"
              width={38}
              height={38}
              className="inline"
            />
            <button onClick={() => handleDeleteImage(item.id, url)}>Del</button>
          </span>
        ))}
        </span>
      </div>
      <div className={tdcss}>
      <label className="w-1/4">Description</label>
        <textarea
          className="w-full border-solid border-2 border-indigo-300"
          rows={15}
          value={item.description}
          onChange={(e) =>
            handleInputChange(item.id, "description", e.target.value)
          }
        />
      </div>
          <Stack spacing={2} direction={"row"} justifyContent={"center"} alignItems="center" >
        <Button  variant="contained"  onClick={() => handleSave(item.id)} >Save</Button>
          
          <Button  variant="contained" onClick={() => handleCancel(item.id)}>Cancel</Button>
        </Stack>
    </div>
  );
};
export default EditPage;
