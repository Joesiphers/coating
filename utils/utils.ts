import { ProductGQL,Product } from "@/types";

/**manage the products array of object from db TO array [] */
export const parseProducts = (productsArray) => {
  console.log("productARR", productsArray, typeof productsArray);
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

export const wpProductGQLToObj = (productGQL:ProductGQL[] )=>{
  let productArray:Product[] =[]  
  
    productGQL.forEach(i=>{
      let productObj:Product={
        id:0,
        title: "",
        subtitle:'',
        imgurl:[''],
        description:'',
        features:'',
        projectApplication:'',
      };
      productObj.id=i.databaseId;      
      productObj.title=i.title;    
      let imgurl:string[]=[];
        console.log("2,progql",productObj,i.podimages.nodes);

      i.podimages.nodes.forEach(y=>
        { console.log(y,imgurl)
          imgurl.push( y.guid)
          }
        )
        productObj.imgurl=imgurl;
      for (let j in i.coating){
          productObj[j]=i.coating[j]
        }
        console.log("uctObj", productObj)
        productArray.push(productObj)

  })
  /*for (let i of productGQL){
      const imgArray=i.podimages.nodes
      for (let y of imgArray){

      }

  }*/
  return productArray
}
