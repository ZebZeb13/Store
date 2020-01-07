import * as React from "react";
import { HashRouter, Router } from "react-router-dom";
import { history } from "../configureStore";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Typography } from "@material-ui/core";
import { JWT_TOKEN_LOCAL_STORAGE } from "../constants";
import jwt_decode from "jwt-decode";
import { JWTUser } from "../model/model";

import * as AuthActions from "../actions/auth";
import { useActions } from "../actions";
const { persistor, store } = configureStore();


export default function({ children }: { children: React.ReactChild }) {
	const authActions = useActions(AuthActions);
	const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE);

	if (token) {
		// Decode token and get user info and exp
		const decoded: any = jwt_decode(token);
		// Check for expired token
		const currentTime = Date.now() / 1000; // to get in milliseconds
		if (decoded.exp < currentTime) {
			authActions.removeUser();

			// Redirect to login
			window.location.href = "/signin";
		}

		authActions.setUser(token);
	}
	return <>{children}</>;
}
