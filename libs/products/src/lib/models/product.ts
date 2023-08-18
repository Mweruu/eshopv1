export class Product {
  id!: string;
  userId?:string;
  name?:string;
  price?:string;
  brand?:string;
  description?:string;
  countInStock?:string;
  category?:string;
  richDescription?:string;
  image?:string;
  images?:string[];
  isFeatured?:string;
  rating?:string;
  numReviews?: number;
  dateCreated?: string;
}
