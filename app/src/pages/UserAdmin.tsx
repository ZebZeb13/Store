import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import { useMutation, useQuery } from "react-apollo";
import { Auth, SignIn, User } from "../gql/type";
import gql from "graphql-tag";
import { useActions } from "../actions";
import * as AuthActions from "../actions/auth";
import { useState } from "react";
import Table, { Column, IRow } from "../components/Table/Table";
import { UserRole } from "../private-route/roles";
import { Button } from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";

interface Props extends RouteComponentProps<void> {}

const GET_USERS = gql`
	query users($page: Int!) {
		users(page: $page) {
			id
			registeredAt
			firstName
			lastName
			email
			roles
			categories {
				name
			}
		}
	}
`;

function UserAdminPage(props: Props) {
	const classes = useStyles();

	const { error, loading, data } = useQuery<{users:IRow[]}>(GET_USERS, {
		variables: { page: 1 },
	});

	console.log(error);
	console.log(loading);
	console.log(data);

	const displayContentConst = (data: any) => {
		return (
			<Button
				onClick={() => {
					console.log(data.id);
				}}
			>
				{data.email}
			</Button>
		);
	};
	const displayHeaderConst = (data: any) => {
		return (
			<Button
				onClick={() => {
					console.log(data.id);
				}}
			>
				{data.label}
			</Button>
		);
	};

	const actionConst = (data: any) => {
		return (
			<div>
				<VisibilityIcon
					onClick={() => {
						console.log(data.id);
					}}
				></VisibilityIcon>
			</div>
		);
	};

	const columnsConst: Column[] = [
		{
			id: "email",
			type: 'String',
			label: "Email",
			displayHeader: displayHeaderConst,
			displayContent: displayContentConst,
		},
		{
			id: "firstName",
			type: 'String',
			label: "First Name",
		},
		{
			id: "lastName",
			type: 'String',
			label: "Last Name",
		},
		{
			id: "roles",
			type: 'String',
			label: "Roles",
		},
		{
			id: "categories",
			type: 'String',
			label: "Categories",
		}
	];	
	if (loading) {
		return loading;
	}
	if (data) {
		const rows: IRow[] = data.users;
		return (
			<div className={classes.root}>
				<Table rows={rows} columnsBase={columnsConst}></Table>
			</div>
		);
	}
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});

export default UserAdminPage;
