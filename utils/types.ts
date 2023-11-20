export interface Author {
  _id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  createdAt: Date;
  education: string;
  bookmarks: string[];
  image: string;
  isAdmin: boolean;
  location: string;
  newsletter: boolean;
  posts: string[];
  preferences: string[];
  websiteURL: string;
  work: string;
  isVerified: boolean;
  updatedAt: Date;
}

export interface Category {
  createdAt: Date;
  desc: string;
  footer: boolean;
  header: boolean;
  image: string;
  title: string;
  topCategory: boolean;
  updatedAt: Date;
  _id: string;
}

export interface Tag {
  _id: string;
  createdAt: Date;
  footer: boolean;
  title: string;
  image: string;
  updatedAt: Date;
}

export interface Post {
  author: Author;
  bestPost: boolean;
  category: Category;
  content: string;
  createdAt: Date;
  featured: boolean;
  image: string;
  likes: Author[];
  readTime: number;
  summery: string;
  tags: Tag[];
  title: string;
  type: string;
  updatedAt: Date;
  _id: string;
}

export interface Base {
  mode: "light" | "dark";
  posts: Post[];
  session: string;
  user: Author;
  bookmarks: Post[];
  likes: Post[];
  categories: Category[];
  tags: Tag[];
  message: string;
  error: boolean;
  success: boolean;
}

export interface State {
  base: Base;
}

export interface CategoryBoxProps {
  setToggleCategories: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCategories?: boolean;
}

export interface AuthorProps {
  author: Author;
}

export interface CheckOutsideClickProps {
  children: React.ReactNode;
  setToggleCategories?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: () => void;
}

export interface PostsProps {
  values: {
    title: string;
    filter: string;
    type: string;
  };
}

export type FilterOptions = {
  title: string;
  value: string;
}[];

export interface RelatedPostsProps {
  post: Post;
}

