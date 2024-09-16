export type Product ={
    productId:number
    title:string;
    subtitle:string;
    imgurl:string[];
    description:string;
    features?:string[][];
    productApplication?: string[];
    productDesigned:string[]
    certificates:string[] ;
}

export type ProductGQL ={
    title:string;
    productId:number;
        subtitle:string;
        description:string;
        features?:string;
        productApplication?:string
        productDesigned:string;
        certificates:string;

    podimages:{
        nodes:{
            guid:string;
        }[]
    }
   
}

export type Project ={
    projectId:number
    title:string;
    subtitle:string;
    description:string;
    imgurl:string[];
    features?:string[];
    productsUsed:string[]
    
}
export type ProjectGQL ={
    title:string;
    projectId:number;
        subtitle:string;
        description:string;
        features?:string;
        productsUsed:string
        technical:string;
        

    podimages:{
        nodes:{
            guid:string;
        }[]
    }
}
export type Cursor={hasMorePage:Boolean,endCursor:string}
