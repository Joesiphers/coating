"use client";
import { useState, useEffect} from "react";
import Image from "next/image";
import { Project } from "@/types";
import { useRouter } from 'next/navigation'
import { Description } from "@headlessui/react";

const Page = ({project}:{project:Project}) => {
  // console.log(project, "editPage");
  const IMG_URL=process.env.NEXT_PUBLIC_IMG_URL
  //const IMG_URL='http://localhost:5002'
  const [project_data, setproject_data] = useState(project);
  const [files, setFiles] = useState<
    {  file: File | null; url: string  }[]
  >([]);
  const [prevfiles, setprevFiles] = useState<
  {name:string ; url: string | ArrayBuffer }[]
>([]);

  const router = useRouter()


  const handleCancel = () => {
   setproject_data(project)
   router.back()

  };

  const handleSave = async () => {
    
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(project_data));
    for (let i = 0; i < files.length; i++) {
      formdata.append("files", files[i]);
    }
    console.log("tosave", project_data, files,project);

    let response =""
    if (project) 
      {console.log ('backendurl',IMG_URL)
        response = await fetch(` ${IMG_URL}/projects`, {  
      method: "POST",
      body: formdata,
       }).then((res) => res.text());
       }else {response = await fetch(`${IMG_URL}/projects`, {
          method: "PUT",
          body: formdata,
        }).then((res) => res.text());

        }
    console.log("response", JSON.stringify(response));
    router.push ('/admin/editproject')
    };

  const handleInputChange = ( field, value) => {
    const updatedData = { ...project_data, [field]: value };
    //console.log(updatedData,field,value, "handleinput")
    setproject_data(updatedData);
  };
  const handleImageUpload =async (e) => {
      const fileReader = new FileReader();
      const loadedFile = e.target.files[0];
      setFiles([...files, loadedFile])
      fileReader.onload = () => {
        //setproject_data({...project_data, imgurl:imgurl})
        setprevFiles((prevFiles) => [
          ...prevFiles,
          { name:loadedFile.name, url: fileReader.result },
        ]);
      };
      fileReader.readAsDataURL(loadedFile);
   // console.log("files", files,files[0].file?.name);

  };
  const handleDeleteImage = ( name:string) => {
    const toDeleteImage=files.findIndex(file=>file.name==name)
    console.log("deleteto", toDeleteImage)
    const updateFiles = prevfiles.filter(file => {
      console.log("delete, existing URL", file,name)
      return file.name !== name;
    });
    console.log("delete prefiles remaing", updateFiles)

    //delete the just upload but not saved images
    setprevFiles(updateFiles);
    setFiles(files.filter(file=>file.name!==name))
    //delete the existing images
    let updateExistingImgurl=project_data?.imgurl?.filter(i=>{
        console.log(i,name, "i!==name")
        return i!==name})||null
    setproject_data({...project_data, imgurl:updateExistingImgurl})
  };
  const tdcss = "p-2 w-full border-solid border-2 border-indigo-600 flex";
      
//console.log(project_data, "project_data")
 
  return (
    <div className="p-8" >

      <div className={'flex  p-2'} >
        <label className="w-1/4">Title</label>
        <input
          className={tdcss}
          type="text"
          value={project_data?.title||""}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      <div className={'flex  p-2'}>
         <label className="w-1/4">SubTitle</label>
        <textarea
          className={tdcss}
          value={project_data?.subtitle||""}
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
                  return <span key={i.file?.name||index} >
                    <Image
                      src={i.url}
                      alt="img"
                      width={38}
                      height={38}
                      className="inline"
                    />
                    <button onClick={() => handleDeleteImage( i.name)}>
                      Del
                    </button>
                  </span>
                },
                )}
          </div>
          <div>
            
            {project_data&&project_data.imgurl&&project_data.imgurl.map((url, index) => (
            <span key={url} >
              <Image
                src={IMG_URL+'/uploads/images/'+url}
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
      
    <div className={'flex  p-2'} >
      <label className="w-1/4">Description</label>
      <textarea
        className={tdcss}
        rows={5}
        value={project_data?.description||""}
        onChange={(e) =>
          handleInputChange( "descrition", e.target.value)
        }
      />
    </div>        
    <div className={'flex  p-2'} >
      <label className="w-1/4">Product Used</label>
      <textarea
        className={tdcss}
        rows={5}
        value={project_data?.product_used||""}
        onChange={(e) =>
          handleInputChange( "product_used", e.target.value)
        }
      />
    </div>  
    <div className={'flex  p-2'} >
        <input type="select"/>
        <label htmlFor="product_used">select products used</label>
        <select name="productUsed" id="product_used" className="rounded border-solid border-2 border-black">
          <option value="proguard 169">progurad 169</option>
          <option value="proguard 168">progurad 168</option>
        </select>
          
      </div>
    
    <button className="m-4 px-4 py-2  bg-blue-700 text-white text-lg rounded "  onClick={() => handleSave()} >{project?"Save":"Add"}</button>
          
          <button className="m-4 px-4 py-2  bg-blue-700 text-white text-lg rounded "  onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};
export default Page;
