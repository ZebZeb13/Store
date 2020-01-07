import React from "react";
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { User } from "../../gql/type";

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from "@material-ui/icons/Save";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
            padding: theme.spacing(2),
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const GET_USER = gql`
	query user($id: Int!) {
		user(id: $id) {
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

interface IProps {
	id: number;
	open: boolean;
	onClose: () => void;
}

export default function AdminViewDialog({ id, open, onClose }: IProps) {
	const { error, loading, data, refetch } = useQuery(GET_USER, {
		variables: { id },
	});

	const handleClose = () => {
		onClose();
	};

	console.log(loading);
	console.log(data);

	let user: undefined | User = data ? data.user : undefined;
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
		>
			{loading === true || !user ? (
				<CircularProgress />
			) : (
				<div>
					<DialogTitle
						id="customized-dialog-title"
						onClose={handleClose}
					>
						{user.firstName} {user.lastName}
					</DialogTitle>
					<DialogContent dividers>User</DialogContent>
					<DialogActions>
                    <Button
							variant="contained"
							color="primary"
							
							startIcon={<EditIcon />}
						>
							Edit
						</Button>
        				<Button
							variant="contained"
							color='secondary'
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
					</DialogActions>
				</div>
			)}
		</Dialog>
	);
}
