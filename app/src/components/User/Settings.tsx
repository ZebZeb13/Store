import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { Trans, useTranslation } from "react-i18next";
import {
	Select,
	MenuItem,
	InputLabel,
	DialogContent,
	IconButton,
    Grid,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";




const useStyles = makeStyles({
	selectLanguages: {
		maxWidth: 200,
	},
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
});

const languages = [
	{ value: "en-US", text: "english" },
	{ value: "fr", text: "french" },
];

export interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
}
export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
}
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
function SettingDialog(props: SimpleDialogProps) {
	const classes = useStyles();
	const { onClose, open } = props;
	const {  i18n } = useTranslation();

	const handleClose = () => {
		onClose();
	};

	console.log(i18n.language)
	const [language, setLanguage] = React.useState(i18n.language);

	const inputLabel = React.useRef<HTMLLabelElement>(null);

	const handleChangeLanguage = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setLanguage(event.target.value as string);
		i18n.changeLanguage(event.target.value as string);
	};


	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="settings-dialog"
			open={open}
			fullWidth
			maxWidth="xs"
		>
			<DialogTitle id="settings-dialog-title" onClose={handleClose}>
				<Grid container direction="row" alignItems="center" spacing={2}>
					<Grid item>
						<SettingsIcon fontSize="small" />
					</Grid>
					<Grid item>
						<Trans i18nKey="user.settings.text">Settings</Trans>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent dividers>
				<InputLabel ref={inputLabel} id="language-select-label">
					<Trans i18nKey="user.settings.languages.text">
						Languages
					</Trans>
				</InputLabel>
				<Select
					labelId="language-select-label"
					id="language-select"
					value={language}
					onChange={handleChangeLanguage}
					className={classes.selectLanguages}
				>
					{languages.map(lng => {
						return (
							<MenuItem value={lng.value} key={'menu-item-'+lng.value}>
								<Trans
									i18nKey={
										"user.settings.languages." + lng.text
									}
								>
									{lng.text}
								</Trans>
							</MenuItem>
						);
					})}
				</Select>
			</DialogContent>
		</Dialog>
	);
}
export default SettingDialog;
