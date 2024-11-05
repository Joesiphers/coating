"use client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditableTr from "./editAbleTr";
import EditPage from "./editPage";
import { Product,ProductRecord } from "@/types";
export type ImageFile = { id: number; file: Blob; url: string | ArrayBuffer | null }

const parseProducts = (productsArray:ProductRecord[] ) => {
  let productsDataObj = (productsArray);
  console.log( "editProduct.page, parseProducts :",productsArray)
  let updateData = [];
  for (let i of productsDataObj) {
    const imgurlArray:string[] =JSON.parse (i.imgurl)
    updateData.push({ ...i, imgurl:imgurlArray });
    }
return updateData}
const tdcss = "border-solid border-2 border-indigo-600";
const EditableTable = ({ }) => {
  //const params = useSearchParams();
 // const { products } = searchParams;
  //const [productsData, setProducts]=useState([])
 // const getProducts=async ()=>await getProductsSwr ("api/products?id=all");

 const [productsData, setproductsData] = useState<Product[]|null> ([]);
 const [editableRowId, setEditableRowId] = useState<Number|null> (null);
 const [prevproductsData, setPrevproductsData] = useState<Product[]|null>(null);
 const [editItem, setEditItem]=useState<Product[]|null> (null)
 const [files, setFiles] = useState<ImageFile [] >([]);

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const { data, isLoading, error } = useSWR<{res:ProductRecord[]}>("api/products?id=all", fetcher);
 console.log("editProduct.page, ",data, isLoading, error)
 useEffect(()=>{
  if(data && data.res){
    const products = parseProducts(data.res)
    setproductsData (products)}
},[data])
if (isLoading) return <div>Loading</div>
if (error ) return <div>Error</div>

  const handleEdit = (id:number) => {
    setEditableRowId(id);
    setPrevproductsData(productsData);
    productsData&&setEditItem(productsData.filter(i=>i.id===id) )
    
  };
  const handleCancel = () => {
        setproductsData(prevproductsData);
    setEditableRowId(null);
    setFiles([]);
  };

  const handleSave = async (id:number) => {
//    if (productsData&&files) {}
    const toSaveData = productsData&&productsData.filter((item) => item.id === id);
    const toAddFiles = Object.values(files).filter((item) => item.id === id);
    const formdata = new FormData();
    if (toSaveData) {formdata.append("data", JSON.stringify(toSaveData[0]));}
    for (let i = 0; i < toAddFiles.length; i++) {
      formdata.append("files", toAddFiles[i].file);
    }
    // formdata.append("files", toAddFiles);
    console.log("editProduct.page, tosave", toSaveData, toAddFiles);
    const response = await fetch(`api/products`, {
      method: "POST",
      body: formdata,
    }).then((res) => res.text());
    console.log("editProduct.page, response", JSON.stringify(response));
    setEditableRowId(null);
    // Implement logic to save changes to the backend or update state as needed
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = productsData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setproductsData(updatedData);
  };
  const handleImageUpload = (e, id) => {
    const choosedFiles = e.target.files;
    console.log("editProduct.page, Handleimagefiles seee5", e);
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
    console.log("editProduct.page, Imagefiles", files);
  };
  const handleDeleteImage = (id, url) => {
    const updateFiles = files.filter((item) => {
      return item.url !== url;
    });
    //delete the just upload but not saved images
    setFiles(updateFiles);
    //delete the existing images
    let deleteImageUrlInProductsData = [];
    const productsArray = productsData;
    for (let p of productsArray) {
      if (p.id === id) {
        //p.imgurl = p.imgurl.filter((u) => u !== url);
        let newimgurl = p.imgurl.filter((u) => u !== url);
        const newdata = { ...p, imgurl: newimgurl };
        console.log("i.imgurl", newdata, "productsData", productsData);
        deleteImageUrlInProductsData.push(newdata);
      } else {
        deleteImageUrlInProductsData.push(p);
      }
    }
    console.log("editProduct.page,  deleteImageUrlInProductsData", deleteImageUrlInProductsData);
    setproductsData(deleteImageUrlInProductsData);
  };
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setproductsData(updatedData);
  };

  const addNewProduct = () => {
    const addProductData = [
      ...productsData,
      {
        id: productsData.length + 1,
        title: "",
        subtitle: "",
        image_url: "",
        description: "",
      },
    ];
    setproductsData(addProductData);
    setEditableRowId(productsData.length + 1);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Image URL</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((item) => (
            <tr key={item.id}>
              {editableRowId === item.id ? (
                <EditableTr
                  key={item.id}
                  item={item}
                  handleEdit={handleEdit}
                  handleDeleteImage={handleDeleteImage}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  handleInputChange={handleInputChange}
                  handleImageUpload={handleImageUpload}
                  files={files}
                  tdcss={tdcss}
                />
              ) : (
                <>
                  <td className={tdcss + " w-1/12"}>{item.id}</td>
                  <td className={tdcss + " w-2/12"}>{item.title}</td>
                  <td className={tdcss + " w-3/12"}>{item.subtitle}</td>
                  <td className={tdcss + " w-2/12"}>
                    {item.imgurl.map((url, index) => (
                      <img
                        key={url + index}
                        src={url}
                        alt="img"
                        width={38}
                        height={38}
                        className="inline"
                      />
                    ))}
                  </td>
                  <td className={tdcss + " w-5/12"}>{item.description}</td>
                  <td className={tdcss}>
                    <span>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addNewProduct}>Add new--</button>
      <img
        src="/uploads/images/xx.jpg"
        alt="img"
        width={38}
        height={38}
        className="inline"
      />
      <Link href={{
        pathname:'edit/editPage',
        query:{id:editableRowId}

      }}>
      <button >Edit newPage</button>
</Link>

      {editableRowId&& <EditPage  
                  key={editableRowId}
                  id={editableRowId}
                  item={productsData[editableRowId-1]}
                 // item={editItem}
                  handleEdit={handleEdit}
                  handleDeleteImage={handleDeleteImage}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  handleInputChange={handleInputChange}
                  handleImageUpload={handleImageUpload}
                  files={files}
                  tdcss={tdcss}
                 />}
    </>
  );
};

export default EditableTable;
