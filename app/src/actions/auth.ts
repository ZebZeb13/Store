import { Action, ActionType, Auth, JWTUser } from "../model/model";
import jwt_decode from "jwt-decode";
import { UserRole } from "../private-route/roles";
import { JWT_TOKEN_LOCAL_STORAGE } from "../constants";

export function setUser(token: string, save: boolean): Action<Auth> {
	if (save === true) {
		setLocalJwtToken(token);
	}else{
		setLocalJwtToken(undefined);
	}
	const decoded: JWTUser = jwt_decode(token);
	return {
		type: ActionType.SET_USER,
		payload: { isAuthentificated: true, user: decoded, token },
	};
}
 
export function removeUser(): Action<Auth> {
	return {
		type: ActionType.SET_USER,
		payload: { isAuthentificated: false, user: undefined, token: undefined },
	};
}


export function setLocalJwtToken(token: undefined | string) {
	if (token) {
		localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE, token);
	} else {
		localStorage.removeItem(JWT_TOKEN_LOCAL_STORAGE);
	}
}
