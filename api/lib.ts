const resturl=process.env.WP_REST_BASE_URL
const GQL_URL="http://34.19.95.27/wordpress/graphql" //process.env.WP_GQL_BASE_URL
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
        body:JSON.stringify({query, variables})
        }
        )
    const json=await res.json()
        if (json.errors) {
            console.error(json.errors);
            throw new Error("Failed to fetch_Gql API ");
          }
          return json.data;
}
export async function getAllProducts_gql ( ){
    const query =`{ products {
                nodes
                {id, title,
                coating
                {subTitle }
                }} }`
    const data=await fetchGql (query)
    return data?.products;
}