import { wpProductGQLToObj,wpProjectGQLToObj } from "@/utils/utils";
import { useSearchParams } from "next/navigation";



/**api for using Wordpress as backend */

const resturl=process.env.WP_REST_BASE_URL
const GQL_URL="http://34.82.14.85/wordpress/graphql" //process.env.WP_GQL_BASE_URL

export async function getProductsWPRestAPI (query?:string,){  
    //const searchParams=useSearchParams()
    //const params=new URLSearchParams(searchParams)
  //  params.set('id',query)
    const res=await fetch (`${resturl}?${query}` ).then(res=>res.json())

//   const res=await fetch (`${resturl}?query=${query}` ).then(res=>res.json())
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
                            productId
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
export async function getProduct_gql (param:number|string ){

    const query =`query product ($id:Int!,$title:String) { 
                    products( where: { id: $id, title:$title}) {
                    edges{
                        cursor
                        node {
                            title
                            productId
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
    
    let productGQLArray=[];
    data?.products.edges.forEach (i=>{
        productGQLArray.push({...i.node,cursor:i.cursor})
     }) ;
    // console.log("wpAPI getProductGql array", productGQLArray, )
     const product=wpProductGQLToObj(productGQLArray)
    return product[0];
}

/**fetch a prodcuts list (array)
 * return title and productId only
*/
export async function getProductIdByTitle_gql (title:string[]){
    const query =`query product ($title:String) { 
                    products( where: {title:$title}) {
                    edges{
                        node {
                            title
                            productId
                        }
                    }
                } }`

    if (title instanceof Array){
        let data=[];
        for (let i of title){
            const variables={'title':i}
            const result = await fetchGql (query, variables)
//            console.log ('i in ',title, i,'result :',result.products.edges)
            data.push({title:i, id:result.products.edges[0] .node.productId})
        }
            return data
        }
}


/*fetch all Projects in GQL

*/ 
export async function getAllProjects_gql (){
    const query =` { projects  {
                        nodes {
                            title
                            projectId
                            subtitle
                            podimages {
                                nodes {
                                    guid
                                    }
                            }
                        }
                } }`
    const data=await fetchGql (query)
    const projects=  wpProjectGQLToObj(data.projects.nodes)
    
    return projects;
}

/**get single project GQL BY id */
export async function getProject_gql (id:number ){
    const query =`query project ($id:Int!) { 
                    projects( where: {id: $id}) {
                        nodes {
                            title
                            projectId
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
                }`
        const variables={"id":id}
    const data=await fetchGql (query, variables)
    console.log("id",id, data?.projects.nodes)
    let projectGQLArray= data?.projects.nodes;
    console.log("wpAPI gerprojectGql array", projectGQLArray, )
     const project=wpProjectGQLToObj(projectGQLArray)
    return project[0];
}

export async function loadMoreProductsPaginated_gql (cursor:string|null =null ){
    const query = ` query getPagedProducts($first: Int!, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
      }
      nodes {
          productId
          title
          subtitle
          podimages {
            nodes {
            guid
            }
          }
      }
      
    }
  }
`;
    const BATCH_SIZE = 2;
    const variables={first:BATCH_SIZE, cursor:cursor}
    console.log('loadmore gql',query, variables)
    let data= await fetchGql (query,variables )
  // data = data.products.edges.map(node=>node.node)
    //const products=  wpProductGQLToObj(data.products.edges)
    
    const products=  wpProductGQLToObj(data.products.nodes)
    const pageInfo= data.products.pageInfo
    return [products,pageInfo]
}

export async function getPreNextProduct_gql (
    cursor:string, batch:number=1, ){
    type Direction = 'before'|'after' 
    let dir=''
    const generateQuery = (direction :Direction)=>{
        
        switch (direction){
            case 'before' : dir='last';
                break;
            case 'after':   dir='first';
                break;
            default: return null
        }
        return ` query getNextProducts($batch: Int!, $${direction}: String) {
            products(${dir}: $batch, ${direction}: $${direction}) {
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
            nodes {
                productId
                title
                }
            }
        }
        `;}
    const genterateVariables=(direction:Direction)=>{return {batch:batch, [direction]:cursor}}
    
    const getPrevNextdata= async ( direction:Direction)=> {
        const query=generateQuery (direction)
        const variables=genterateVariables(direction)
        const data=await fetchGql (query ,variables )
        const product=  data.products.nodes
//        const product=  wpProductGQLToObj(data.products.nodes)

        const pageInfo= data.products.pageInfo

       // const productId=product[0].productId
    //    console.log("pageInfo PrevNextproducts", data.products.pageInfo,product)
        //return {hasNextPage,hasPreviousPage,startCursor, endCursor}
        return {pageInfo,product}
    }
    const prev =await getPrevNextdata('before')
    const next =await getPrevNextdata('after')
    return {prev:prev.product[0], next:next.product[0]}
}