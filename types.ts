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
    description:string;
    imgurl:string[];
    features?:string[]
}
export type ProductDetails = {
    id: number;
    title: string;
    subtitle: string;
    imgurl: string;
    features?: string;
    description: string;
    projectApplication?: string;
  };
