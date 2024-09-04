export type Project ={
    id:number
    title:string;
    subtitle:string;
    description:string;
    imgurl:string[];
    features?:string[];
    productsUsed:string[]
    
}

export type Product ={
    id:number
    title:string;
    subtitle:string;
    imgurl:string[];
    description:string;
    features?:string;
    projectApplication?: string;
    technical:string;
    certificates:string;
}

export type ProductGQL ={
    title:string;
    databaseId:number;
        subtitle:string;
        description:string;
        features?:string;
        projectapplication?:string
        technical:string;
        certificates:string;

    podimages:{
        nodes:{
            guid:string;
        }[]
    }
   
}
export type ProjectGQL ={
    title:string;
    databaseId:number;
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