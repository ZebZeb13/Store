// prettier-ignore
import { withWidth } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { WithWidth } from "@material-ui/core/withWidth";

import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Router, Switch, Redirect } from "react-router-dom";
import { Todo } from "./model/model";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import { RootState } from "./reducers/index";
import withRoot from "./withRoot";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import AppBar from "./components/AppBar/AppBar";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import Middlwares from "./middleware";
import Authorization from "./private-route/Authorization";
import { UserRole } from "./private-route/roles";
import PrivateRoute from "./private-route/PrivateRoute";
import DashboardPage from "./pages/DashboardPage ";
import UserAdminPage from "./pages/UserAdmin";


const AdminPage = Authorization([]);

function Routes() {
	const classes = useStyles();

	return (
		<div>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/todo" component={TodoPage} />
			<Route exact={true} path="/signin" component={SignInPage} />
			<Route exact={true} path="/signup" component={SignUpPage} />
			<Switch>
				<PrivateRoute exact={true} path={'/dashboard'} component={DashboardPage}/>
				<PrivateRoute exact={true} path={'/admin/user'} component={AdminPage(UserAdminPage)}/>
			</Switch>
		</div>
	);
}

interface Props extends RouteComponentProps<void>, WithWidth {
	todoList: Todo[];
}

function App(props?: Props) {
	const classes = useStyles();


	return (
		<div className={classes.root}>
			<AppBar/>
			<Routes />
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function mapStateToProps(state: RootState) {
	return {
		todoList: state.todoList,
	};
}

export default connect(mapStateToProps)(withRoot(withWidth()(App)));
