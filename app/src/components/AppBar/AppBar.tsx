// prettier-ignore
import { AppBar as AppBarMaterialUI, IconButton, Toolbar, Typography, withWidth, Menu, MenuItem, Grid, Button, Drawer, ListSubheader } from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, createStyles } from "@material-ui/styles";
import * as React from "react";
import clsx from "clsx";
import { connect, useSelector } from "react-redux";
import { Trans } from "react-i18next";
import { RootState } from "../../reducers/index";
import withRoot from "../../withRoot";
import Settings from "../User/Settings";
import FaceIcon from "@material-ui/icons/Face";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import { Link, Redirect } from "react-router-dom";
import { useActions } from "../../actions";
import * as AuthActions from "../../actions/auth";
import { Routes } from "../../middleware/router";

interface Props {}
function AppBar(props?: Props) {
	const classes = useStyles();
	const theme = useTheme();
	const auth = useSelector((state: RootState) => state.auth);
	const authActions = useActions(AuthActions);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [openSettings, setOpenSettings] = React.useState(false);

	const [openDrawer, setOpenDrawer] = React.useState(false);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSettingsOpen = () => {
		setOpenSettings(true);
	};
	const handleSettingsClose = () => {
		setOpenSettings(false);
	};

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};
	return (
		<div className={classes.root}>
			<AppBarMaterialUI
				position="static"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: openDrawer,
				})}
			>
				<Toolbar>
					<Typography variant="h6" noWrap className={classes.title}>
						DeviStore
					</Typography>
					{auth.isAuthentificated ? (
						<>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={handleMenu}
								edge="end"
								className={clsx(openDrawer && classes.hide)}
							>
								<AccountCircleIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem
									onClick={handleClose}
									key="menu-item-profile"
								>
									<Grid
										container
										direction="row"
										alignItems="center"
										spacing={1}
									>
										<Grid item>
											<FaceIcon fontSize="small" />
										</Grid>
										<Grid item>Profile</Grid>
									</Grid>
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleClose();
										handleSettingsOpen();
									}}
									key="menu-item-settings"
								>
									<Grid
										container
										direction="row"
										alignItems="center"
										spacing={1}
									>
										<Grid item>
											<SettingsIcon fontSize="small" />
										</Grid>
										<Grid item>
											<Trans i18nKey="user.settings.text">
												Settings
											</Trans>
										</Grid>
									</Grid>
								</MenuItem>
								<MenuItem key="menu-item-signout">
									<Grid
										container
										direction="row"
										alignItems="center"
										spacing={1}
									>
										<Grid item>
											<Button
												onClick={() => {
													handleClose();
													authActions.removeUser();
												}}
												variant="contained"
												color="secondary"
											>
												<Trans i18nKey="user.signout">
													Sign Out
												</Trans>
											</Button>
										</Grid>
									</Grid>
								</MenuItem>
								<Settings
									open={openSettings}
									onClose={handleSettingsClose}
								/>
							</Menu>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="end"
								onClick={handleDrawerOpen}
								className={clsx(openDrawer && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
						</>
					) : (
						<Button
							component={Link}
							to={Routes.SIGNIN}
							variant="contained"
							color="secondary"
						>
							<Trans i18nKey="user.signin">Sign In</Trans>
						</Button>
					)}
				</Toolbar>
			</AppBarMaterialUI>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={openDrawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem
						button
						key="dashboard"
						component={Link}
						to={Routes.DASHBOARD}
					>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItem>
				</List>
				<Divider />
				<ListSubheader>Admin</ListSubheader>
				<List>
					<ListItem
						button
						key="dashboard"
						component={Link}
						to={Routes.ADMIN_USER}
					>
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText primary="User" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginRight: drawerWidth,
		},
		title: {
			flexGrow: 1,
		},
		hide: {
			display: "none",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
			...theme.mixins.toolbar,
			justifyContent: "flex-start",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginRight: -drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginRight: 0,
		},
	})
);

function mapStateToProps(state: RootState) {
	return {
		todoList: state.todoList,
	};
}

export default connect(mapStateToProps)(withRoot(withWidth()(AppBar)));
