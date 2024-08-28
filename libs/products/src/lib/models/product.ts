import { Category } from "./category";

export class Product {
  id?: string;
  userId?:string;
  name?:string;
  price?:number;
  brand?:string;
  description?:string;
  countInStock?:string;
  category?:Category;
  richDescription?:string;
  image?:string;
  images?:string[];
  // images?:File[];
  isFeatured?:string;
  rating?:string;
  numReviews?: number;
  dateCreated?: string;
}
