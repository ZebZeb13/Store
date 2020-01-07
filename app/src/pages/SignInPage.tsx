import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import { useMutation } from "react-apollo";
import { Auth, SignIn } from "../gql/type";
import gql from "graphql-tag";
import { useActions } from "../actions";
import * as AuthActions from "../actions/auth";
import { useState } from "react";

interface Props extends RouteComponentProps<void> {}

const SIGNUP_USER = gql`
	mutation signIn($data: SignInInput!) {
		signIn(data: $data) {
			user {
				firstName
			}
			token
		}
	}
`;

function SignInPage(props: Props) {
	const classes = useStyles();

	const [signIn, { error, loading, data }] = useMutation<
		{
			signIn: Auth;
		},
		{ data: SignIn }
	>(SIGNUP_USER);

	const authActions = useActions(AuthActions);
	const [saveToken, setSaveToken] = useState<boolean>(false);
	const submit = (data: SignIn, save: boolean) => {
		signIn({ variables: { data } });
		setSaveToken(save);
	};

	if (data) {
		console.log(data);
		if (data.signIn && data.signIn.token) {
			authActions.setUser(data.signIn.token, saveToken);
			return <Redirect to="/dashboard" />;
		}
	}
	return (
		<div className={classes.root}>
			<SignInForm
				submit={submit}
				error={
					error
						? error.message.split("GraphQL error: ")[1]
						: undefined
				}
			></SignInForm>
		</div>
	);
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

export default SignInPage;
