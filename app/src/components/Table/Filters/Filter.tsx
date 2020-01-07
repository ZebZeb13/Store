import React, { ReactChild } from "react";
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


function getStyles(name: string, selected: string[], theme: Theme) {
	return {
		fontSize: 'small',
		fontWeight:
			selected.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
			
	};
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface IData {
	label: string;
	value: string;
}

export interface IFilter {
	data: IData[];
}

interface IProps {
	data: IData[];
}

export default function Filter({data}: IProps) {
	const classes = useStyles();

	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const [selected, setSelected] = React.useState<string[]>([]);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOk = () => {
		setAnchorEl(null);
	};
	const handleClickReset = () => {
		setAnchorEl(null);
	};

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelected(event.target.value as string[]);
	};


	return (
		<div>
			<IconButton aria-label="delete" onClick={handleClick} size="small">
				<FilterListIcon fontSize='small'/>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Grid container direction="column" justify="center" spacing={1}>
					<Grid item>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-mutiple-chip-label">
								Chip
							</InputLabel>
							<Select
								labelId="demo-mutiple-chip-label"
								id="demo-mutiple-chip"
								multiple
								value={selected}
								onChange={handleChange}
								input={<Input id="select-multiple-chip" />}
								renderValue={selected => (
									<div className={classes.chips}>
										{(selected as string[]).map(value => (
											<Chip
												key={value}
												label={value}
												className={classes.chip}
												size='small'
											/>
										))}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{data.map(filter => (
									<MenuItem
										key={filter.value}
										value={filter.value}
										style={getStyles(
											filter.label,
											selected,
											theme
										)}
									>
										{filter.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="center"
						>
							<Grid item>
								<Button
									variant="outlined"
									size="small"
									onClick={() => handleClickOk()}
								>
									OK
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									size="small"
									onClick={() => handleClickReset()}
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Menu>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			maxWidth: 300,
		},
		chips: {
			display: "flex",
			flexWrap: "wrap",
		},
		chip: {
			margin: 2,
		},
		noLabel: {
			marginTop: theme.spacing(3),
		},
	})
);
