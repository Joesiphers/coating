import { ProductGQL,Product,Project,ProjectGQL } from "@/types";

/**manage the products array of object from db TO array [] */
export const parseProducts = (productsArray) => {
  //console.log("productARR", productsArray, typeof productsArray);
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
        features:[],
        projectApplication:[],
        productDesigned:[],
        certificates:[]
      };
      let imgurl:string[]=[];
      for (let j in i){
        if (j=='title'|j=='subtitle'|j=='description')
        {productObj[j]=i[j]
        }
        else if (j=='podimages')
          {i.podimages.nodes.forEach(y=>
            { //console.log(y,imgurl)
              imgurl.push( y.guid)
              } )
            productObj.imgurl=imgurl;
          }
        else if (j=='databaseId'){
                productObj.id=i.databaseId;
  
        }else if (j=='features'){
          productObj.features=i.features?.split(';').map(item=>item.split(':')) 
          //to [ [a,b],[c,d]  ]
        }
          else {
            productObj[j]=i[j].split(';')

          }
        /*
        productObj.features=i.features?.split(';')
        productObj.productDesigned=i.productDesigned.split(';')
        productObj.certificates=i.certificates.split(';')
        productObj.projectApplication=i.projectapplication?.split(';')
        */
      }
      //  //console.log("productObj", productObj)
        productArray.push(productObj)
  })
  return productArray
}

const wpProjectGQLToObj = (projectGQL:ProjectGQL[] )=>{
  let projectsArray:Project[] =[]  
    projectGQL.forEach(i=>{
      let projectObj:Project={
        id:0,
        title: "",
        subtitle:'',
        imgurl:[''],
        description:'',
        features:[],
        productsUsed:[],
      };
      for (let j in i){
        let imgurl:string[]=[];
        switch(j) {
        case 'features':{projectObj.features=i.features?.split(';')}
        case 'podimages' : i.podimages.nodes.forEach(y=>
          { //console.log(y,imgurl)
            imgurl.push( y.guid)
            }
          )
        case 'productsUsed'  :projectObj.productsUsed=i.productsUsed?.split(';')
          break;
        default: projectObj[j]=i[j]
      }
      projectObj.id=i.databaseId
      projectObj.imgurl=imgurl;
    }
      //projectObj.id=i.databaseId; 
     //   console.log("2,progql",projectObj,i.podimages.nodes);

      

      //  //console.log("projectObj", projectObj)
        projectsArray.push(projectObj)

  })
  return projectsArray}

  export  {wpProjectGQLToObj}