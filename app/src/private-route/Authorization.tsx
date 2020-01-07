import React, { ReactChild, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { UserRole } from "./roles";
import { useSelector, connect } from "react-redux";
import { RootState } from "../reducers";
import withRoot from "../withRoot";
import { WithWidth } from "@material-ui/core/withWidth";

const Authorization = (allowedRoles: UserRole[]) => (WrappedComponent: any) =>
	function WithAuthorization(props: any) {
		const auth = useSelector((state: RootState) => state.auth);
		let isRole = false;
		if (auth.user) {
			const { roles } = auth.user;
			if (allowedRoles.length > 0) {
				isRole = roles.some((role: UserRole) =>
					allowedRoles.includes(role)
				);
			} else {
				isRole = true;
			}
		}

		if (isRole) {
			return <WrappedComponent {...props} />;
		} else {
			return <Redirect to="/" />;
		}
	};

export default Authorization;
