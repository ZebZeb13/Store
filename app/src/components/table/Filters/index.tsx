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
	Box,
} from "@material-ui/core";
import { lighten, Theme, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import Sort from "./Sort";
import Search from "./Search";
import Filter, { IFilter } from "./Filter";
import DateTime from "./DateTime";
import Range from "./Range";

export interface IFilters {
	search?: boolean;
	filter?: IFilter;
	dateTime?: boolean;
	range?: boolean;
}

interface IProps {
	filters: IFilters;
}

export default function Filters({ filters }: IProps) {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			wrap="nowrap"
		>
			<Grid item className={classes.separator}></Grid>
			{filters.search ? (
				<Grid item>
					<Search />
				</Grid>
			) : null}
			{filters.filter ? (
				<Grid item>
					<Filter data={filters.filter.data} />
				</Grid>
			) : null}
			{filters.dateTime ? (
				<Grid item>
					<DateTime />
				</Grid>
			) : null}
			{filters.range ? (
				<Grid item>
					<Range />
				</Grid>
			) : null}
		</Grid>
	);
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		separator: {
			width: 20,
		},
	})
);
