import React, { ReactChild, useState } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
	Grid,
	Fab,
	IconButton,
	makeStyles,
	createStyles,
	Button,
	TextField,
	Menu,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
	Input,
	Chip,
} from "@material-ui/core";
import { lighten, Theme, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";

type Order = "asc" | "desc" | undefined;

export default function Sort() {
	const classes = useStyles();

	const [order, setOrder] = useState<Order>(undefined);

	const handleClickUp = () => {
		if(order === 'asc'){
			setOrder(undefined);
		}else{
			setOrder('asc');
		}
	}

	const handleClickDown = () => {
		if(order === 'desc'){
			setOrder(undefined);
		}else{
			setOrder('desc');
		}
	}

	return (
		<div className={classes.root}>
			<Grid container direction="column" justify="center">
				<Grid item className={classes.item}>
					<IconButton
						size="small"
						className={classes.iconButton}
						color={order === 'asc' ? "primary" : undefined}
						onClick={() => handleClickUp()}
					>
						<ArrowDropUpIcon className={classes.iconUp} />
					</IconButton>
				</Grid>
				<Grid item className={classes.item}>
					<IconButton
						size="small"
						className={classes.iconButton}
						color={order === "desc" ? "primary" : undefined}
						onClick={() => handleClickDown()}
					>
						<ArrowDropDownIcon className={classes.iconDown} />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: "10px",
		},
		item: {
			verticalAlign: "middle !important",
			marginBottom: "-10px",
		},
		iconUp: {
			marginTop: "-5px",
		},
		iconDown: {
			marginTop: "-5px",
		},
		iconButton: {
			width: 15,
			height: 15,
			padding: 0,
			// marginTop: "-5px",
		},
	})
);
