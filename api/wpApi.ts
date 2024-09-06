import { wpProductGQLToObj,wpProjectGQLToObj } from "@/utils/utils";


/**api for using Wordpress as backend */

const resturl=process.env.WP_REST_BASE_URL
const GQL_URL="http://34.82.14.85/wordpress/graphql" //process.env.WP_GQL_BASE_URL

export async function getProducts (query?:string,){  
              
   const res=await fetch (`${GQL_URL}?query=`+query ).then(res=>res.json())
   return res
}
export async function getProductsRestAPI (query?:string){
    const res=await fetch (`${resturl}/product/?${query}`).then(res=>res.json())
    return res
 }

 export async function fetchGql (query="", variables?:Record<string,any>){  
    const headers ={"Content-Type":"Application/json"}
    const res=await fetch (GQL_URL,{
        headers,
        method:"POST",
        body:JSON.stringify({query, variables}),
        cache:'no-store', // cachepolicy
        }
        )
    const json=await res.json()
        if (json.errors) {
            console.log("json.errors", json.errors);
            throw new Error("Failed to fetch_Gql API ");
          }
          return json.data;
}
export async function getAllProducts_gql (){
    const query =` { products  {
                        nodes {
                            title
                            databaseId
                            subtitle
                            podimages {
                                nodes {
                                    guid
                                    }
                            }
                        }
                } }`
    const data=await fetchGql (query)
    //console.log("wpAPI geproductGql array", data.products.nodes, )

    const products=  wpProductGQLToObj(data.products.nodes)
    
    return products;
}

/**fetch a product data with id:number or title:string 
 * return all the data of this product
*/
export async function getProduct_gql (param:number|string){

    const query =`query product ($id:Int!,$title:String) { 
                    products( where: { id: $id, title:$title}) {
                    edges{
                        node {
                            title
                            databaseId
                            description
                            features
                            subtitle
                            productApplication
                            productDesigned
                            certificates
                            podimages {
                                nodes {
                                    guid
                                    }
                            }
                        }
                    }
                } }`
    const variables= typeof param ==='number'? {"id":param,"title":''}:{'id':0, "title":param}
    //console.log(param ,typeof param, variables)
    
    const data=await fetchGql (query, variables)
    //console.log("data",data.products.edges)
    let productGQLArray=[];
     data?.products.edges.forEach (i=>{
        productGQLArray.push(i.node)
     }) ;
    // console.log("wpAPI getProductGql array", productGQLArray, )
     const product=wpProductGQLToObj(productGQLArray)
    return product[0];
}
/**fetch a prodcuts list (array)
 * return title and databaseId only
*/
export async function getProductIdByTitle_gql (title:string[]){
    const query =`query product ($title:String) { 
                    products( where: {title:$title}) {
                    edges{
                        node {
                            title
                            databaseId
                        }
                    }
                } }`

    if (title instanceof Array){
        let data=[];
        for (let i of title){
            const variables={'title':i}
            const result = await fetchGql (query, variables)
//            console.log ('i in ',title, i,'result :',result.products.edges)
            data.push({title:i, id:result.products.edges[0] .node.databaseId})
        }
            console.log("GetIdbyTitleGQL data",data)
            return data
        }
}


/*fetch all Projects in GQL

*/ 
export async function getAllProjects_gql (){
    const query =` { projects  {
                        nodes {
                            title
                            databaseId
                            subtitle
                            podimages {
                                nodes {
                                    guid
                                    }
                            }
                        }
                } }`
    const data=await fetchGql (query)
    console.log("wpAPI getAllProjetctGql array", data.projects.nodes, )
    const projects=  wpProjectGQLToObj(data.projects.nodes)
    
    return projects;
}

/**get single project GQL BY id */
export async function getProject_gql (id:number ){
    const query =`query project ($id:Int!) { 
                    projects( where: {id: $id}) {
                    edges{
                        node {
                            title
                            databaseId
                            description
                            features
                            subtitle
                            productsUsed
                            podimages {
                                nodes {
                                    guid
                                    }
                            }
                        }
                    }
                } }`
        const variables={"id":id}
    const data=await fetchGql (query, variables)
    let projectGQLArray=[];
     data?.projects.edges.forEach (i=>{
        projectGQLArray.push(i.node)
     }) ;
    // console.log("wpAPI gerprojectGql array", projectGQLArray, )
     const project=wpProjectGQLToObj(projectGQLArray)
    return project[0];
}