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
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DateTime() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
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
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date("2014-08-18T21:11:54")
	);

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<div>
			<IconButton aria-label="delete" onClick={handleClick} size="small">
				<DateRangeIcon fontSize="small" />
				<AccessTimeIcon fontSize="small" />
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
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Date picker dialog"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
							/>
							<KeyboardTimePicker
								margin="normal"
								id="time-picker"
								label="Time picker"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									"aria-label": "change time",
								}}
							/>
						</MuiPickersUtilsProvider>
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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			height: "10px",
		},
	})
);
