interface Category {
  id: string;
  name: string;
  items: string[]; 
  description: string;
  img?: string;
}
interface Categories {
  [key: string]: Category;
}