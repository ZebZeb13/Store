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
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import ToolsBarTable from "./ToolsBar";
import HeaderTable from "./Header";
import { Grid } from "@material-ui/core";
import { IFilters } from "./Filters";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
			position: "relative",
			zIndex: 1,
			margin: "auto",
			overflow: "auto",
			"& thead": {
				"& th": {
					background: "#fff",
					// position: '-webkit-sticky',
					position: "sticky",
					top: 0,
				},
				"& th:first-child": {
					zIndex: 5,
				},
				"& th:nth-child(2)": {
					zIndex: 5,
				},
			},
			"& th:first-child": {
				// position: '-webkit-sticky',
				position: "sticky",
				left: 0,
				zIndex: 2,
				background: "#ccc",
				// color: '#fff',
			},
			"& th:nth-child(2)": {
				// position: '-webkit-sticky',
				position: "sticky",
				// padding: '1em',
				left: "2.5rem",
				zIndex: 2,
				background: "#ccc",
				// color: '#fff',
			},
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
	})
);

export interface IRow {
	id: string;
	[key: string]: any;
}
interface IProps {
	rows: IRow[];
	columnsBase: Column[];
}

interface IType {
	String: string;
	Int: number;
	Float: string;
}

type Order = "asc" | "desc";

export interface Column {
	id: string;
	type?: keyof IType;
	label: string;
	displayHeader?: (data: any) => ReactChild;
	displayContent?: (data: any) => ReactChild;
	minWidth?: number;
	align?: "center";
	sort?: boolean;
	filters?: IFilters;
}

export default function CustomTable({ rows, columnsBase }: IProps) {
	const classes = useStyles();
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [columns, setColumns] = React.useState<Column[]>(columnsBase);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		// property: keyof Data
		property: string
	) => {};

	const handleToggleSort = (
		event: React.MouseEvent<unknown>,
		property: string
		// property: keyof Data
	) => {};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<Paper className={classes.root}>
			<ToolsBarTable numSelected={selected.length} />

			<div className={classes.tableWrapper}>
				<Table
					// stickyHeader
					className={classes.table}
					aria-labelledby="tableTitle"
					aria-label="enhanced table"
				>
					<HeaderTable
						numSelected={selected.length}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						onToggleSort={handleToggleSort}
						rowCount={rows.length}
						columns={columns}
					/>
					<TableBody>
						{rows.map((row, index) => {
							const isItemSelected = isSelected(row.id);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.id}
									selected={isItemSelected}
								>
									<TableCell
										padding="checkbox"
										component="th"
										scope="row"
										onClick={event =>
											handleClick(event, row.id)
										}
									>
										<Checkbox
											checked={isItemSelected}
											inputProps={{
												"aria-labelledby": labelId,
											}}
											icon={
												<CheckBoxOutlineBlankIcon fontSize="small" />
											}
											checkedIcon={
												<CheckBoxIcon fontSize="small" />
											}
										/>
									</TableCell>
									{columns.map((column, index) => {
										const value = row[column.id];
										if (column.displayContent) {
											return (
												<TableCell>
													<Grid
														container
														direction="row"
														justify="center"
														alignItems="center"
													>
														<Grid item>
															{column.displayContent(
																row
															)}
														</Grid>
													</Grid>
												</TableCell>
											);
										}
										if (index > 0) {
											return (
												<TableCell>{value}</TableCell>
											);
										}
										return (
											<TableCell
												component="th"
												scope="row"
											>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
