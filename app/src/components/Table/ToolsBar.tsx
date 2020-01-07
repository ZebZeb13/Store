import React, { ReactChild } from "react";
import clsx from "clsx";
import {
	createStyles,
	lighten,
	makeStyles,
	Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { User, Category } from "../../gql/type";
import { UserRole } from "../../private-route/roles";
import { Button, Grid, Tab, Menu, MenuItem } from "@material-ui/core";
import { Interface } from "readline";

const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
		highlight:
			theme.palette.type === "light"
				? {
						color: theme.palette.secondary.main,
						backgroundColor: lighten(
							theme.palette.secondary.light,
							0.85
						),
				  }
				: {
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.secondary.dark,
				  },
		title: {
			flex: "1 1 100%",
		},
	})
);

interface IProps {
	label: string;
	numSelected: number;
	onDelete: () => void;
}

export default function CustomToolsBar({label, numSelected, onDelete}: IProps) {
	const classes = useToolbarStyles();

	const handleClickDelete = () => {
		onDelete();
	}

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
				>
					{label}
				</Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete" onClick={() => handleClickDelete()}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<div>

				</div>
			)}
		</Toolbar>
	);
}
