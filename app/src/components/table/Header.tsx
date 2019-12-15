import React, { ReactChild } from "react";
import clsx from "clsx";
import {
	createStyles,
	lighten,
	makeStyles,
	Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { User, Category } from "../../gql/type";
import { UserRole } from "../../private-route/roles";
import { Button, Grid, Tab } from "@material-ui/core";
import { Interface } from "readline";
import { Column } from "./Table";
import Filters, { IFilters } from "./Filters/index";
import Sort from "./Filters/Sort";

interface IProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		// property: keyof Data
		property: string
	) => void;
	onToggleSort: (
		event: React.MouseEvent<unknown>,
		// property: keyof Data
		property: string
	) => void;
	onSelectAllClick: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void;
	rowCount: number;
	columns: Column[];
	filters?: IFilters;
}

export default function HeaderTable({
	onSelectAllClick,
	numSelected,
	rowCount,
	onRequestSort,
	onToggleSort,
	columns,
}: IProps) {
	const classes = useStyles();
	const createRequestSortHandler = (property: string) => (
		event: React.MouseEvent<unknown>
	) => {
		onRequestSort(event, property);
	};
	const createToggleSortHandler = (property: string) => (
		event: React.MouseEvent<unknown>
	) => {
		onToggleSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				<TableCell
					padding="checkbox"
					component="th"
					scope="row"
				>
					<Checkbox
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
					/>
				</TableCell>
				{columns.map(column => {
					if (column.displayHeader) {
						return (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.displayHeader(column)}
							</TableCell>
						);
					}
					return (
						<TableCell
							key={column.id}
							align={column.align}
							style={{ minWidth: column.minWidth }}
							className={classes.cell}
							component="th"
							scope="row"
						>
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
								wrap="nowrap"
							>
								<Grid item>
									<Grid
										container
										direction="row"
										justify="center"
										alignItems="center"
										wrap="nowrap"
										spacing={1}
									>
										<Grid item>{column.label}</Grid>
										{column.sort ? (
											<Grid item>
												<Sort />
											</Grid>
										) : null}
									</Grid>
								</Grid>
								{column.filters ? (
									<Grid item>
										<Filters filters={column.filters} />
									</Grid>
								) : null}
							</Grid>
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		paper: {
			width: "100%",
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		tableWrapper: {
			maxHeight: 600,
			overflow: "auto",
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1,
		},
		button: {
			textTransform: "none",
		},
		cell: {
			background: '#fff',
			"&:hover": {
				background: '#fff',
				backgroundColor: "rgba(223, 220, 219)",
			},
		},
		checkBox: {
			position: "relative",
		},
	})
);
