"use client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditableTr from "./editAbleTr";
import EditPage from "./editPage";

const parseProducts = (productsArray) => {
  let productsDataObj = (productsArray);
  //console.log(productsArray)
  let updateData = [];
  for (let i of productsDataObj) {
    updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
    }
return updateData;;}
const tdcss = "border-solid border-2 border-indigo-600";
const EditableTable = ({ searchParams }) => {
  //const params = useSearchParams();
 // const { products } = searchParams;
  //const [productsData, setProducts]=useState([])
 // const getProducts=async ()=>await getProductsSwr ("api/products?id=all");

 const [productsData, setproductsData] = useState([]);
 const [editableRowId, setEditableRowId] = useState(null);
 const [prevproductsData, setPrevproductsData] = useState(null);
 const [editItem, setEditItem]=useState(null)
 const [files, setFiles] = useState<
   { id: number; file: File | null; url: string | ArrayBuffer | null }[]
 >([]);

const fetcher = (...args) => fetch(...args).then((res) => res.json());
 const { data, isLoading, error } = useSWR("api/products?id=all", fetcher);
 //console.log(data, isLoading, error)
 useEffect(()=>{
  if(data && data.res){ setproductsData (parseProducts(data.res))}
},[data])
if (isLoading) return <div>Loading</div>
if (error ) return <div>Error</div>

  const handleEdit = (id) => {
    setEditableRowId(id);
    setPrevproductsData(productsData);
    setEditItem(productsData.filter(i=>i.id===id) )
    
  };
  const handleCancel = () => {
        setproductsData(prevproductsData);
    setEditableRowId(null);
    setFiles([]);
  };

  const handleSave = async (id) => {
    const toSaveData = productsData.filter((item) => item.id === id);
    const toAddFiles = Object.values(files).filter((item) => item.id === id);
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(toSaveData[0]));
    for (let i = 0; i < toAddFiles.length; i++) {
      formdata.append("files", toAddFiles[i].file);
    }
    // formdata.append("files", toAddFiles);
    console.log("tosave", toSaveData, toAddFiles);
    const response = await fetch(`api/products`, {
      method: "POST",
      body: formdata,
    }).then((res) => res.text());
    console.log("response", JSON.stringify(response));
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
    console.log("deleteImageUrlInProductsData", deleteImageUrlInProductsData);
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
