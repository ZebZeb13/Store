import { Action, ActionType, Todo, Auth, JWTUser } from "../model/model";
import createReducer from "./createReducer";
import { UserRole } from "../private-route/roles";

export const auth = createReducer<Auth>({ isAuthentificated: false, user: undefined, token: undefined }, {
	[ActionType.SET_USER](state: Auth, action: Action<Auth>) {
		return action.payload;
	},
	[ActionType.REMOVE_USER](state: Auth, action: Action<Auth>) {
		return action.payload;
	},
});
