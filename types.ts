export type Product ={
    productId:number
    cursor:string;
    title:string;
    subtitle:string;
    content:string;
    imgurl:string[];
    description:string;
    features?:string[][][];
    productApplication?: string[];
    productDesigned:string[]
    certificates:string[] ;
}

export type ProductGQL ={
    title:string;
    cursor?:string;
    productId:number;
        subtitle:string;
        content:string;
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
    cursor?:string;
    title:string;
    subtitle:string;
    content:string;
    description:string;
    imgurl:string[];
    features?:string[];
    productsUsed:string[]
    
}
export type ProjectGQL ={
    title:string;
    projectId:number;
    cursor?:string;
        subtitle:string;
        content:string;
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
