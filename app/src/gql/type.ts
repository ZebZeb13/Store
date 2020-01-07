import { UserRole } from "../private-route/roles";

export interface Message {
    content: string;
}

export interface News {
    latestNews: Message;
}

export interface RocketInventory {
    id: number;
    model: string;
    year: number;
    stock: number;
}

export interface NewRocketDetails {
    model: string;
    year: number;
    stock: number;
}



export interface Category {
    id: number;
    name: string;
    creator: User;
  }

export interface User {
    id: number;
    registeredAt: number;
    updatedAt: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: UserRole[];
    categories: Category[];
}

export interface Auth {
    token: string;
    user: User;
}

export  interface SignUp {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export  interface SignIn {
    email: string;
    password: string;
}