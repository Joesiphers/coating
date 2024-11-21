import { ProductGQL,Product,Project,ProjectGQL } from "@/types";
import { dbquery } from "./db";

/**manage the products array of object from db TO array [] */
const parseProducts = (productsArray) => {
  // productsArray type of Object
  let updateData = [];
  for (let i of productsArray) {
    //convert imgurl from string to array
    updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
  }
  return updateData;
};

/*pass title to url*/
const parse_title_to_url = (title: string) => {
  const result = title.replaceAll(" ", "-");
  return result;
};

 const wpProductGQLToObj= (productGQL:ProductGQL[])=>{
  const productsObj = productGQL.map((i: ProductGQL )=>{
    const product ={
      productId:i.productId ||0,
      cursor:i.cursor||"",
      title:i.title||"",
      subtitle:i.subtitle||"",
      content:i.content||"",
      description:i.description||"",
      features:i.features?.split(';').map(
        item=> item?item.split(':').map(i=>i?i.split(','):null ):null
         )||[[[]]],
      certificates:i.certificates?.split(';')||[],
      productDesigned:i.productDesigned?.split(';')||[],
      productApplication:i.productApplication?.split(';')||[],    
      imgurl:i.podimages.nodes.map(node=>node.guid)
    } 
    return product
  })
  return productsObj
}

  const wpProjectGQLToObj = (projectGQL:ProjectGQL[] )=>{
    const data=projectGQL.map(project=>{
      console.log(project,"wpProjectGQLtoOBJ")
      const projectObj :Project={
        projectId:project.projectId||0,
        cursor:project.cursor||"",
        title:project.title||'',
        subtitle:project.subtitle||'',
        content:project.content||"",
        description:project.description||'',
        features:project.features?.split(';')||[],
        productsUsed:project.productsUsed?.split(';')||[],
        imgurl:project.podimages.nodes.map(node=>node.guid)||[]
      }
      return projectObj
    })
    return data
  
  }


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
   export  {wpProjectGQLToObj, wpProductGQLToObj,parseProducts,parse_title_to_url}