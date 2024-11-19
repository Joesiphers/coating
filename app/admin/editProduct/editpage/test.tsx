"use client";
import { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import { Product } from "@/types";

const Test = ({product}) => {
  // console.log(product, "editPage");

  const [product_data, setProduct_data] = useState(product);
  const [files, setFiles] = useState<
    { id: number; file: File | null; url: string | ArrayBuffer | null }[]
  >([]);

  const handleCancel = () => {
   setProduct_data(product)
  };

  const handleSave = async () => {
    const toSaveData = product_data;
    const toAddFiles =files
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(toSaveData));
    for (let i = 0; i < toAddFiles.length; i++) {
      formdata.append("files", toAddFiles[i].file);
    }
    //console.log("tosave", toSaveData, toAddFiles);
   // savePage(toSaveData, toAddFiles)

    let response =""
    if (product) {response = await fetch(`/admin/api/products?`, {
      method: "POST",
      body: formdata,
    }).then((res) => res.text());
  }else {response = await fetch(`/admin/api/products?`, {
    method: "PUT",
    body: formdata,
  }).then((res) => res.text());

  }
    console.log("response", JSON.stringify(response)); 
    
    };

  const handleInputChange = ( field, value) => {
    const updatedData = { ...product_data, [field]: value };
    //console.log(updatedData,field,value, "handleinput")
    setProduct_data(updatedData);
  };
  const handleImageUpload = (e) => {
    const choosedFiles = e.target.files;
    //console.log("files seee5", e);
    for (let i = 0; i < choosedFiles.length; i++) {
      const fileReader = new FileReader();
      const file = choosedFiles[i];
      fileReader.onload = () => {
        setFiles((prevFiles) => [
          ...prevFiles,
          { file, url: fileReader.result },
        ]);
      };
      fileReader.readAsDataURL(file);
    }
   // console.log("files", files);
  };
  const handleDeleteImage = (product_id, url) => {
    const updateFiles = files.filter((product_data) => {
      return product_data.url !== url;
    });
    //delete the just upload but not saved images
    setFiles(updateFiles);
    //delete the existing images
    //const deleteExistingImage=()=>{
      let newImgurl=product_data.imgurl.filter(i=>i!==url)
      setProduct_data({...product_data, imgurl:newImgurl})
    //  console.log("deleteImage", url, newImgurl,{...product_data} )
   // }
    //deleteExistingImage()
  };
  const tdcss = "p-2 w-full border-solid border-2 border-indigo-600 flex";
  let html:ReactElement[]=[];
  for (let i in product_data){
    const list=[ 'description','features','certificates','product_application','product_designed' ]
    if (list.includes(i) ){
      //console.log(i, product_data[i])
      html.push( <div className={'flex  p-2'} key={i}>
        <label className="w-1/4">{i}</label>
          <textarea
            className={tdcss}
            rows={5}
            value={product_data[i]||""}
            onChange={(e) =>
              handleInputChange( i, e.target.value)
            }
          />
        </div>
      ) }
  }
  return (
    <div className="p-8" >

      <div className={'flex  p-2'} >
        <label className="w-1/4">Title</label>
        <input
          className={tdcss}
          type="text"
          value={product_data?.title||""}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      <div className={'flex  p-2'}>
         <label className="w-1/4">SubTitle</label>
        <textarea
          className={tdcss}
          value={product_data?.subtitle||""}
          rows={2}
          onChange={(e) =>
            handleInputChange( "subtitle", e.target.value)
          }
        />
      </div>
      <div className={'flex  p-2'}>
          <label className="w-1/4">Images    </label>
        <div className="w-full">
          <div>
          <input
            className={""}
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e)}
          />
          {files[0] && files.map(
              (i, index) =>
              (
                  <span key={i.name + index}>
                    <Image
                      src={i.url}
                      alt="img"
                      width={38}
                      height={38}
                      className="inline"
                    />
                    <button onClick={() => handleDeleteImage( i.url)}>
                      Del
                    </button>
                  </span>
                ),
                )}
          </div>
          <div>
            
            {product_data&&product_data.imgurl&&product_data.imgurl.map((url, index) => (
            <span key={url}>
              <Image
                src={url}
                alt="img"
                width={50}
                height={50}
                className="inline"
              />
              <button onClick={() => handleDeleteImage(product_data.product_id, url)}>Del</button>
            </span>
          ))}
        </div>
        </div>
 
      </div>
      
      {html}
        <button className="m-4 px-4 py-2  bg-blue-700 text-white text-lg rounded "  onClick={() => handleSave()} >{product?"Save":"Add"}</button>
          
          <button className="m-4 px-4 py-2  bg-blue-700 text-white text-lg rounded "  onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};
export default Test;
