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
	Typography,
	Slider,
} from "@material-ui/core";
import { lighten, Theme, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";

export default function Range() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const [value, setValue] = React.useState<number[]>([20, 37]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleChange = (event: any, newValue: number | number[]) => {
	  setValue(newValue as number[]);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOk = () => {
		setAnchorEl(null);
	};
	const handleClickReset = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton aria-label="delete" onClick={handleClick} size="small">
				<SettingsEthernetIcon fontSize="small" />
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
						<Typography id="range-slider" gutterBottom>
							Range
						</Typography>
						<Slider
							value={value}
							onChange={handleChange}
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
							getAriaValueText={valuetext}
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

function valuetext(value: number) {
	return `${value}°C`;
  }
  
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			height: "10px",
		},
	})
);
