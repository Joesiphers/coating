"use client";
import { useState, useEffect} from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useRouter } from 'next/navigation'
 

const Page = ({product}:{product:Product}) => {
  // console.log(product, "editPage");
  const root_url='http://localhost:5002'
  const [product_data, setProduct_data] = useState(product);
  const [files, setFiles] = useState<
    {  file: File | null; url: string | ArrayBuffer | null }[]
  >([]);
  const [prevfiles, setprevFiles] = useState<
  {file: File | null; url: string | ArrayBuffer | null }[]
>([]);

  const router = useRouter()


  const handleCancel = () => {
   setProduct_data(product)
   router.back()

  };

  const handleSave = async () => {
    const toSaveData = product_data;
    const toAddFiles =files
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(toSaveData));
    for (let i = 0; i < toAddFiles.length; i++) {
      formdata.append("files", toAddFiles[i]);
    }
    console.log("tosave", toSaveData, toAddFiles,product);
   // savePage(toSaveData, toAddFiles)

    let response =""
    //if (product) {response = await fetch(`/admin/api/products?`, {
    if (product) 
      {console.log ('backendurl',root_url)
        response = await fetch(` ${root_url}/products?id=124`, {  
      method: "POST",
      body: formdata,
       }).then((res) => res.text());
       }else {response = await fetch(`/admin/api/products?id=124`, {
          method: "PUT",
          body: formdata,
        }).then((res) => res.text());

        }
    console.log("response", JSON.stringify(response));
    //router.push ('/admin/editProduct')
    };

  const handleInputChange = ( field, value) => {
    const updatedData = { ...product_data, [field]: value };
    //console.log(updatedData,field,value, "handleinput")
    setProduct_data(updatedData);
  };
  const handleImageUpload =async (e) => {
      const fileReader = new FileReader();
      const loadedFile = e.target.files[0];
      setFiles([...files, loadedFile])
      fileReader.onload = () => {
        //setProduct_data({...product_data, imgurl:imgurl})
        setprevFiles((prevFiles) => [
          ...prevFiles,
          { loadedFile, url: fileReader.result },
        ]);
      };
      fileReader.readAsDataURL(loadedFile);
   // console.log("files", files,files[0].file?.name);

  };
  const handleDeleteImage = ( url) => {
    console.log("delete URL", url)
    const updateFiles = files.filter(file => {
      return file.url !== url;
    });
    //delete the just upload but not saved images
    setprevFiles(updateFiles);
    //delete the existing images
      let updateExistingImgurl=product_data?.imgurl?.filter(i=>i!==url)||null
      setProduct_data({...product_data, imgurl:updateExistingImgurl})
  };
  const tdcss = "p-2 w-full border-solid border-2 border-indigo-600 flex";
  const list=[ 'description','features','certificates','product_application','product_designed' ]
  const html = list.map(i=>{
    return <div className={'flex  p-2'} key={i}>
    <label className="w-1/4">{i}</label>
      <textarea
        className={tdcss}
        rows={5}
        value={product_data?.[i]||""}
        onChange={(e) =>
          handleInputChange( i, e.target.value)
        }
      />
    </div>})

 
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
          {prevfiles[0] && prevfiles.map(
              (i, index) =>
              {//console.log(i.file?.name,i.url, "file")
                  return <span key={i.file?.name||index}>
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
                },
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
              <button onClick={() => handleDeleteImage( url)}>Del</button>
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
export default Page;
