import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { NewRocketDetails, Auth, SignUp } from "../gql/type";

interface Props extends RouteComponentProps<void> {}

const SIGNUP_USER = gql`
	mutation signUp($data: SignUpInput!) {
		signUp(data: $data) {
			user {
				firstName
			}
			token
		}
	}
`;

function SignUpPage(props: Props) {
	const classes = useStyles();

	const [
		signup,
		{ error,loading, data },
	] = useMutation<
		{
			signup: Auth;
		},
		{ data: SignUp }
	>(SIGNUP_USER);

	const submit =(data: SignUp) =>{
		signup({variables:{data}});
	}

	return (
		<div className={classes.root}>
			<SignUpForm submit={submit} error={error ? error.message.split('GraphQL error: ')[1] : undefined }></SignUpForm> 
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

export default SignUpPage;
