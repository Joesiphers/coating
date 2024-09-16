import { ProductGQL,Product,Project,ProjectGQL } from "@/types";


/**manage the products array of object from db TO array [] */
export const parseProducts = (productsArray) => {
  // productsArray type of Object
  let updateData = [];
  for (let i of productsArray) {
    //convert imgurl from string to array
    updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
  }
  return updateData;
};

/*pass title to url*/
export const parse_title_to_url = (title: string) => {
  const result = title.replaceAll(" ", "-");
  return result;
};

 const wpProductGQLToObj= (productGQL:ProductGQL[])=>{
  const productsObj = productGQL.map((i: ProductGQL )=>{
    const product ={
      productId:i.productId,
      title:i.title,
      subtitle:i.subtitle,
      description:i.description,
      features:i.features?.split(';')||[],
      certificates:i.certificates.split(';'),
      productDesigned:i.productDesigned.split(';')||[],
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
        title:project.title||'',
        subtitle:project.subtitle||'',
        description:project.description||'',
        features:project.features?.split(';')||[],
        productsUsed:project.productsUsed?.split(';')||[],
        imgurl:project.podimages.nodes.map(node=>node.guid)||[]
      }
      return projectObj
    })
    return data
  
  }
   export  {wpProjectGQLToObj, wpProductGQLToObj}