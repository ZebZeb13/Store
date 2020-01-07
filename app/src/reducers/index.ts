import { History } from "history";
import { combineReducers } from "redux";
import { Auth, Todo } from "../model/model";
import * as todoReducer from "./todo";
import * as authReducer from "./auth";

export interface RootState {
	todoList: Todo[];
	auth: Auth;
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...authReducer,
	});
