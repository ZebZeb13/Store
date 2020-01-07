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
import {
	FormHelperText,
	Chip,
	Checkbox,
} from "@material-ui/core";
import * as EmailValidator from "email-validator";
import GeneralConditionsDialog from "./GeneralConditions";
import { Trans } from "react-i18next";

interface ISignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface IProps {
	submit: any;
	error: undefined | string;
}

type Error = ReactChild | undefined;

const PASSWORD_MIN_LENGTH = 8;

function SignUpForm({ submit, error }: IProps) {
	const classes = useStyles();
	const [firstName, setFirstName] = useState<string>("");
	const [firstNameError, setFirstNameError] = useState<Error>(
		undefined
	);
	const [lastName, setLastName] = useState<string>("");
	const [lastNameError, setLastNameError] = useState<Error>(undefined);

	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<Error>(undefined);

	const [password, setPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<Error>(undefined);

	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [passwordConfirmError, setPasswordConfirmError] = useState<
		Error
	>(undefined);

	const [openGeneralConditions, setOpenGeneralConditions] = useState<
		boolean
	>(false);
	const [generalConditions, setGeneralConditions] = useState<boolean>(
		false
	);
	const [generalConditionsError, setGeneralConditionsError] = useState<
		Error
	>(undefined);

	const handleChangeFirstName = (event: any) => {
		const value = event.target.value;
		setFirstName(value);
		checkFirstName(value);
	};
	const checkFirstName = (value: string): boolean => {
		if (value === "") {
			setFirstNameError(
				<Trans i18nKey="user.firstName.error.required">
					Please enter your first name!
				</Trans>
			);
			return false;
		} else {
			setFirstNameError(undefined);
			return true;
		}
	};

	const handleChangeLastName = (event: any) => {
		const value = event.target.value;
		setLastName(value);
		checkLastName(value);
	};
	const checkLastName = (value: string): boolean => {
		if (value === "") {
			setLastNameError(
				<Trans i18nKey="user.lastName.error.required">
					Please enter your name!
				</Trans>
			);
			return false;
		} else {
			setLastNameError(undefined);
			return true;
		}
	};

	const handleChangeEmail = (event: any) => {
		const value = event.target.value;
		setEmail(value);
		checkEmail(value);
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
		checkPasswords(value, passwordConfirm);
	};

	const handleChangePasswordConfirm = (event: any) => {
		const value = event.target.value;
		setPasswordConfirm(value);
		checkPasswords(password, value);
	};

	const checkPasswords = (password1: string, password2: string): boolean => {
		let error: boolean = false;
		if (password1 === "") {
			setPasswordError(
				<Trans i18nKey="user.password.error.required">
					Please enter your password!
				</Trans>
			);
			error = true;
		} else if (password1.length < PASSWORD_MIN_LENGTH) {
			setPasswordError(
				<Trans i18nKey="user.password.error.minLength">
					Password too short (minimun {{PASSWORD_MIN_LENGTH}})
				</Trans>
			);
			error = true;
		} else {
			setPasswordError(undefined);
		}
		if (password2 === "") {
			setPasswordConfirmError(
				<Trans i18nKey="user.passwordConfirmation.error.required">
					Please confirm your password!
				</Trans>
			);
			error = true;
		} else if (password1 !== password2) {
			setPasswordConfirmError(
				<Trans i18nKey="user.passwordConfirmation.error.correspondance">
					Two passwords that you enter are inconsistent!
				</Trans>
			);
			error = true;
		}
		if (error) {
			return false;
		}
		setPasswordConfirmError(undefined);
		return true;
	};

	const handleChangeGeneralConditions = () => {
		setGeneralConditions(!generalConditions);
		checkGeneralConditions(!generalConditions);
	}
	const checkGeneralConditions = (value: boolean): boolean => {
		console.log(value);
		if (value === false) {
			setGeneralConditionsError(
				<Trans i18nKey="user.generalConditions.error.required">
					Please confirm general conditions
				</Trans>
			);
			return false;
		} else {
			setGeneralConditionsError(undefined);
			return true;
		}
	};

	const handleSubmit = () => {
		const errors: boolean[] = [
			checkFirstName(firstName),
			checkLastName(lastName),
			checkEmail(email),
			checkPasswords(password, passwordConfirm),
			checkGeneralConditions(generalConditions),
		];
		if (!errors.includes(false)) {
			const newUser: ISignUp = {
				firstName,
				lastName,
				email,
				password,
			};
			submit(newUser);
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
					<Trans i18nKey="user.signup">Sign Up</Trans>
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label={
									<Trans i18nKey="user.firstName.text">
										First Name
									</Trans>
								}
								autoFocus
								onChange={handleChangeFirstName}
								error={firstNameError ? true : undefined}
							/>
							{firstNameError ? ErrorText(firstNameError) : null}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label={
									<Trans i18nKey="user.lastName.text">
										Last Name
									</Trans>
								}
								name="lastName"
								autoComplete="lname"
								onChange={handleChangeLastName}
								error={lastNameError ? true : undefined}
							/>
							{lastNameError ? ErrorText(lastNameError) : null}
						</Grid>
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
							<TextField
								variant="outlined"
								required
								fullWidth
								name="passwordConfirm"
								label={
									<Trans i18nKey="user.passwordConfirmation.text">
										Password Confirmation
									</Trans>
								}
								type="password"
								id="passwordConfirmation"
								autoComplete="current-password"
								onChange={handleChangePasswordConfirm}
								error={passwordConfirmError ? true : undefined}
							/>
							{passwordConfirmError
								? ErrorText(passwordConfirmError)
								: null}
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
										onChange={() => handleChangeGeneralConditions()}
									/>
								</Grid>
								<Grid item>
									<Button
										onClick={() =>
											setOpenGeneralConditions(true)
										}
									>
										<Trans i18nKey="user.generalConditions.text">
											General Conditions
										</Trans>
									</Button>
									{generalConditionsError
								? ErrorText(generalConditionsError)
								: null}
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
							<Link href="/signin" variant="body2">
								<Trans i18nKey="user.alreadyHaveAcount">
									Already have an account? Sign in
								</Trans>
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<GeneralConditionsDialog
				open={openGeneralConditions}
				onClose={() => setOpenGeneralConditions(false)}
			></GeneralConditionsDialog>
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
		marginTop: theme.spacing(3),
	},
	formControl: {
		width: "100%",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default SignUpForm;
