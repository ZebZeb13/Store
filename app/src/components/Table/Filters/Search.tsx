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

export default function Search() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [value, setValue] = React.useState<undefined | string>(undefined);
	const [actif, setActif] = React.useState<boolean>(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value; 
		setValue(newValue);
		if(newValue == ''){
			setActif(false);
		}
	};
	const handleClickSearch = () => {
		setActif(true);
		setAnchorEl(null);
	};
	const handleClickReset = () => {
		setActif(false);
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton aria-label="delete" onClick={handleClick} size="small">
				<SearchIcon
					fontSize="small"
					color={actif ? "primary" : undefined}
				/>
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
						<TextField
							id="outlined-basic"
							label="Search"
							variant="outlined"
							InputProps={{ classes: { input: classes.input1 } }}
							onChange={handleChange}
						/>
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
									variant="contained"
									size="small"
									color="primary"
									startIcon={<SearchIcon />}
									onClick={() => handleClickSearch()}
									disabled={!value || value == '' ? true : undefined }
								>
									Search
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
		textField: {
			height: "10px",
		},
		input1: {
			height: 5,
		},
	})
);
