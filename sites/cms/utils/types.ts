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

export interface Base{
    name:string,
    success:boolean,
    message:string,
    error:boolean,
    filter:string,
    user:Author
}

export interface State{
    base: Base
}