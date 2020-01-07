import FormControlLabel from "@material-ui/core/FormControlLabel";

import React, { ReactChild, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText, Chip, Checkbox } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import GeneralConditionsDialog from "./GeneralConditions";
import { Trans } from "react-i18next";

interface ISignIn {
	email: string;
	password: string;
}

interface IProps {
	submit: any;
	error: undefined | string;
}

type Error = ReactChild | undefined;

const PASSWORD_MIN_LENGTH = 8;

function SignInForm({ submit, error }: IProps) {
	const classes = useStyles();
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<Error>(undefined);

	const [password, setPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<Error>(undefined);

	const [rememberMe, setrememberMe] = useState<boolean>(false);

	const handleChangeEmail = (event: any) => {
		const value = event.target.value;
		setEmail(value);
	};
	const checkEmail = (value: string): boolean => {
		if (value === "") {
			setEmailError(
				<Trans i18nKey="user.emailAddress.error.required">
					Please enter your email!
				</Trans>
			);
			return false;
		} else if (!EmailValidator.validate(value)) {
			setEmailError(
				<Trans i18nKey="user.email.error.type">
					The input is not valid E-mail!
				</Trans>
			);
			return false;
		} else {
			setEmailError(undefined);
			return true;
		}
	};

	const handleChangePassword = (event: any) => {
		const value = event.target.value;
		setPassword(value);
	};

	const checkPasswords = (password: string): boolean => {
		let error: boolean = false;
		if (password === "") {
			setPasswordError(
				<Trans i18nKey="user.password.error.required">
					Please enter your password!
				</Trans>
			);
			error = true;
		} else if (password.length < PASSWORD_MIN_LENGTH) {
			setPasswordError(
				<Trans i18nKey="user.password.error.minLength">
					Password too short (minimun {{ PASSWORD_MIN_LENGTH }})
				</Trans>
			);
			error = true;
		} else {
			setPasswordError(undefined);
		}

		if (error) {
			return false;
		}
		return true;
	};
	const handleChangeRememberMe = () => {
		setrememberMe(!rememberMe);
	};
	const handleSubmit = () => {
		const errors: boolean[] = [checkEmail(email), checkPasswords(password)];
		if (!errors.includes(false)) {
			const newUser: ISignIn = {
				email,
				password,
			};
			submit(newUser, rememberMe);
		} else {
			console.log("bad form");
		}
	};
	const ErrorText = (content: ReactChild) => {
		return <FormHelperText error>{content}</FormHelperText>;
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					<Trans i18nKey="user.signin">Sign In</Trans>
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label={
									<Trans i18nKey="user.emailAddress.text">
										Email Address
									</Trans>
								}
								name="email"
								autoComplete="email"
								onChange={handleChangeEmail}
								error={emailError ? true : undefined}
							/>
							{emailError ? ErrorText(emailError) : null}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label={
									<Trans i18nKey="user.password.text">
										Password
									</Trans>
								}
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChangePassword}
								error={passwordError ? true : undefined}
							/>
							{passwordError ? ErrorText(passwordError) : null}
						</Grid>

						<Grid item xs={12}>
							<Grid
								container
								direction="row"
								justify="center"
								alignItems="center"
							>
								<Grid item>
									<Checkbox
										value="allowExtraEmails"
										color="primary"
										onChange={() =>
											handleChangeRememberMe()
										}
									/>
								</Grid>
								<Grid item>
									<Trans i18nKey="user.rememberMe.text">
										Remember me
									</Trans>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							{error ? (
								<Chip label={error} color="secondary"></Chip>
							) : null}
						</Grid>
					</Grid>
					<Button
						// type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						<Trans i18nKey="user.signup">Sign Up</Trans>
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signup" variant="body2">
								<Trans i18nKey="user.alreadyHaveAcount">
									Don't have acount? Sign up
								</Trans>
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default SignInForm;
