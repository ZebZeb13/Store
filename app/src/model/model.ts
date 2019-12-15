import { UserRole } from "../private-route/roles";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}



export interface JWTUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: UserRole[];
  }

export interface Auth {
    user: undefined | JWTUser;
    isAuthentificated: boolean;
    token: undefined | string;
  }
  
export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SET_USER,
    REMOVE_USER,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}