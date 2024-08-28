export type Project ={
    id:number
    title:string;
    subtitle:string;
    description:string;
    imgurl:string[];
    features?:string[]
}
export type Product ={
    id:number
    title:string;
    subtitle:string;
    imgurl:string[];
    description:string;
    features?:string;
    projectApplication?: string;
}
export type ProductRecord = {
    id: number;
    title: string;
    subtitle: string;
    imgurl: string;
    description: string;
    features?: string;
    projectApplication?: string;
  };
export type ProductGQL ={
    title:string;
    databaseId:number;
    coating:{
        subtitle:string;
        description:string;
        features?:string;
        projectapplication:string|null
    }
    podimages:{
        nodes:{
            guid:string;
        }[]
    }
   
}