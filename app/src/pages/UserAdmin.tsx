import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps, Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import { useMutation, useQuery } from "react-apollo";
import { Auth, SignIn, User } from "../gql/type";
import gql from "graphql-tag";
import { useActions } from "../actions";
import * as AuthActions from "../actions/auth";
import { UserRole } from "../private-route/roles";
import Paper from "@material-ui/core/Paper";
import {
	PagingState,
	CustomPaging,
	SortingState,
	Sorting,
	SearchState,
	DataTypeProvider,
	SelectionState,
	IntegratedSelection,
	GridColumnExtension,
} from "@devexpress/dx-react-grid";
import {
	Grid,
	Table,
	TableHeaderRow,
	PagingPanel,
	VirtualTable,
	SearchPanel,
	TableSelection,
	Toolbar,
	TableFixedColumns,
	TableColumnVisibility,
	ColumnChooser,
} from "@devexpress/dx-react-grid-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Theme } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";
import CustomToolsBar from "../components/Table/ToolsBar";

interface Props extends RouteComponentProps<void> {}

const GET_USERS = gql`
	query users(
		$page: Int!
		$pageSize: Int!
		$search: String
		$sortingColumn: String
		$sortingDirection: String
	) {
		users(
			page: $page
			pageSize: $pageSize
			search: $search
			sortingColumn: $sortingColumn
			sortingDirection: $sortingDirection
		) {
			users {
				id
				registeredAt
				firstName
				lastName
				email
				# roles
				# categories {
				# 	name
				# }
			}
			totalCount
		}
	}
`;

const DeleteFormater = (id: number) => (
	<IconButton aria-label="delete">
		<DeleteIcon />
	</IconButton>
);
const DeleteTypeProvider = (props: any) => (
	<DataTypeProvider formatterComponent={DeleteFormater} {...props} />
);

function UserAdminPage(props: Props) {
	const classes = useStyles();

	const { error, loading, data, refetch } = useQuery(GET_USERS, {
		variables: { page: 0, pageSize: 5 },
	});

	const [columns] = useState([
		{ name: "id", title: "Id" },
		{ name: "firstName", title: "First Name" },
		{ name: "lastName", title: "Last Name" },
		{ name: "email", title: "Email" },
		{ name: "delete", title: "Delete", align: "center" },
	]);
	const [tableColumnExtensions] = useState<GridColumnExtension[]>([
		{ columnName: "id" },
		{ columnName: "firstName" },
		{ columnName: "lastName" },
		{ columnName: "email", width: 200 },
		{ columnName: "delete", align: "center", width: 100 },
	]);
	const [deleteColumn] = useState(["delete"]);
	const [leftColumns] = useState([]);
	const [rightColumns] = useState(["delete"]);

	const [hiddenColumnNames, setHiddenColumnNames] = useState<any[]>([]);

	const [rows, setRows] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	//   const [loading, setLoading] = useState(false);
	const [lastQueryParameters, setLastQueryParameters] = useState({
		page: 0,
		pageSize: 5,
		search: "",
		sortingColumn: "id",
		sortingDirection: "asc",
	});
	const [pageSizes] = useState([5, 10, 20, 30, 0]);
	const [sorting, setSorting] = useState<Sorting[]>([
		{ columnName: "id", direction: "asc" },
	]);
	const [selection, setSelection] = useState<any[]>([]);

	const loadData = () => {
		const parameters = {
			page: currentPage,
			pageSize,
			search: searchValue,
			sortingColumn: sorting[0].columnName,
			sortingDirection: sorting[0].direction,
		};
		if (
			JSON.stringify(parameters) !== JSON.stringify(lastQueryParameters)
		) {
			refetch(parameters);
			setLastQueryParameters(parameters);
		}
	};

	if (data) {
		if (data.users.users !== rows) {
			setRows(data.users.users);
			setTotalCount(data.users.totalCount);
		}
	}

	useEffect(() => {
		console.log(selection);
		if (loading === false) {
			loadData();
		}
	});

	return (
		<div>
			{/* <span>Total rows selected: {selection.length}</span> */}
			<Paper style={{ position: "relative" }}>
				<CustomToolsBar numSelected={selection.length} />
				<Grid rows={rows} columns={columns}>
					<SelectionState
						selection={selection}
						onSelectionChange={setSelection}
					/>
					<SearchState onValueChange={setSearchValue} />
					<SortingState
						sorting={sorting}
						onSortingChange={setSorting}
					/>
					<PagingState
						currentPage={currentPage}
						onCurrentPageChange={setCurrentPage}
						pageSize={pageSize}
						onPageSizeChange={setPageSize}
					/>
					<CustomPaging totalCount={totalCount} />

					<DeleteTypeProvider for={deleteColumn} />
					{/* <IntegratedPaging /> */}
					<VirtualTable />
					<Table columnExtensions={tableColumnExtensions} />
					<TableHeaderRow showSortingControls />
					<TableColumnVisibility
						hiddenColumnNames={hiddenColumnNames}
						onHiddenColumnNamesChange={setHiddenColumnNames}
					/>
					<Toolbar />
					<SearchPanel />
					<ColumnChooser />
					<IntegratedSelection />
					<TableSelection showSelectAll />
					<TableFixedColumns
						leftColumns={leftColumns}
						rightColumns={rightColumns}
					/>
					<PagingPanel pageSizes={pageSizes} />
				</Grid>
				{loading && <CircularProgress />}
			</Paper>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});

export default UserAdminPage;

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
