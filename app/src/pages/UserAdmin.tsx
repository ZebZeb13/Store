import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps, Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import { useMutation, useQuery, useLazyQuery } from "react-apollo";
import {
	Auth,
	SignIn,
	User,
	ResultOutput,
	IdInput,
	IdsInput,
} from "../gql/type";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Theme, Grid as GridMUI } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";
import CustomToolsBar from "../components/Table/ToolsBar";
import AdminViewDialog from "../components/User/AdminViewDialog";
import { da } from "date-fns/esm/locale";
import ActionTypeProvider from "../components/Table/ActionTypeProvider";

interface IProps {}

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

const REMOVE_USER = gql`
	mutation removeUser($data: IdInput!) {
		removeUser(data: $data) {
			success
			description
		}
	}
`;

const REMOVE_USERS = gql`
	mutation removeUsers($data: IdsInput!) {
		removeUsers(data: $data) {
			success
			description
		}
	}
`;

//----------------------------------------------------------------------------------------------
function UserAdminPage({}: IProps) {
	const classes = useStyles();

	const { error, loading, data, refetch } = useQuery(GET_USERS, {
		variables: { page: 0, pageSize: 5 },
	});

	const [
		removeUser,
		{
			error: errorRemoveUser,
			loading: loadingRemoveUser,
			data: dataRemoveUser,
		},
	] = useMutation<
		{
			removeUser: ResultOutput;
		},
		{ data: IdInput }
	>(REMOVE_USER);

	const [
		removeUsers,
		{
			error: errorRemoveUsers,
			loading: loadingRemoveUsers,
			data: dataRemoveUsers,
		},
	] = useMutation<
		{
			removeUsers: ResultOutput;
		},
		{ data: IdsInput }
	>(REMOVE_USERS);

	//----------------------------------------------------------------------------------------------
	const [columns] = useState([
		{ name: "id", title: "Id" },
		{ name: "firstName", title: "First Name" },
		{ name: "lastName", title: "Last Name" },
		{ name: "email", title: "Email" },
		{
			name: "action",
			title: "Action",
			align: "center",
			getCellValue: (row: any) => row.id,
		},
	]);
	const [tableColumnExtensions] = useState<GridColumnExtension[]>([
		{ columnName: "id" },
		{ columnName: "firstName" },
		{ columnName: "lastName" },
		{ columnName: "email", width: 200 },
		{ columnName: "action", align: "center", width: 100 },
	]);
	const [actionColumn] = useState(["action"]);
	const [leftColumns] = useState([]);
	const [rightColumns] = useState(["action"]);

	const [hiddenColumnNames, setHiddenColumnNames] = useState<any[]>([]);

	const [rows, setRows] = useState<User[]>([]);
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
	const [sortingStateColumnExtensions] = useState([
		{ columnName: "action", sortingEnabled: false },
	]);
	const [selection, setSelection] = useState<any[]>([]);

	const [openView, setOpenView] = React.useState(false);

	const [userIdView, setUserIdView] = useState<undefined | number>(undefined);

	//----------------------------------------------------------------------------------------------

	const loadData = (force: boolean = false) => {
		const parameters = {
			page: currentPage,
			pageSize,
			search: searchValue,
			sortingColumn: sorting[0].columnName,
			sortingDirection: sorting[0].direction,
		};
		if (
			JSON.stringify(parameters) !==
				JSON.stringify(lastQueryParameters) ||
			force == true
		) {
			refetch(parameters);
			setLastQueryParameters(parameters);
		}
	};

	useEffect(() => {
		if (data && data.users && data.users.users) {
			setRows(data.users.users);
			setTotalCount(data.users.totalCount);
		}
	}, [data]);

	useEffect(() => {
		if (loading === false) {
			loadData();
		}
	}, [searchValue, sorting, pageSize, currentPage]);

	useEffect(() => {
		loadData(true);
	}, [dataRemoveUser, dataRemoveUsers]);
	//----------------------------------------------------------------------------------------------



	//----------------------------------------------------------------------------------------------

	return (
		<div>
			{userIdView ? (
				<AdminViewDialog
					id={userIdView}
					open={openView}
					onClose={() => {
						setOpenView(false);
						setUserIdView(undefined);
					}}
				/>
			) : null}
			<Paper style={{ position: "relative" }}>
				<CustomToolsBar
					label="Users"
					numSelected={selection.length}
					onDelete={() => {
						removeUsers({
							variables: {
								data: {
									ids: selection.map(index => {
										return rows[index].id;
									}),
								},
							},
						});
						setSelection([]);
					}}
				/>
				{/* {loading && <CircularProgress />} */}
				<Grid rows={rows} columns={columns}>
					<SelectionState
						selection={selection}
						onSelectionChange={setSelection}
					/>
					<SearchState onValueChange={setSearchValue} />
					<SortingState
						sorting={sorting}
						onSortingChange={setSorting}
						columnExtensions={sortingStateColumnExtensions}
					/>
					<PagingState
						currentPage={currentPage}
						onCurrentPageChange={setCurrentPage}
						pageSize={pageSize}
						onPageSizeChange={setPageSize}
					/>
					<CustomPaging totalCount={totalCount} />

					<ActionTypeProvider
						for={actionColumn}
						onView={(id: number) => {
							setOpenView(true);
							setUserIdView(id);
						}}
						onDelete={(id: number) => {
							removeUser({
								variables: { data: { id} },
							});
							setSelection([]);
						}}
					/>
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
