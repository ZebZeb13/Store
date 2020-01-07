import * as React from "react";
import { HashRouter, Router } from "react-router-dom";
import { history } from "../configureStore";

export enum Routes {
	HOME = "/",
	DASHBOARD = "/dashboard",
	SIGNIN = "/signin",
	SIGNUP = "/signup",
	ADMIN_USER = "/admin/user",
}

export default function({ children }: { children: React.ReactChild }) {
	return <Router history={history}>{children}</Router>;
}
