import { Theme, Button, Badge, Grid } from "@material-ui/core";
import { makeStyles, withStyles, createStyles } from "@material-ui/styles";
import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Close from "@material-ui/icons/Close";
import Search from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { validate } from "@babel/types";

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

interface Props {}

enum TabType {
	SEARCH,
	OBJECT,
}
interface ITab {
	type: TabType;
	key: number;
	id: number;
}

interface ISearchTab extends ITab {
	search: string;
}

interface IObjectTab extends ITab {
	name: string;
}

interface ILocalTabs {
	tabs: (ISearchTab | IObjectTab)[];
	value: number;
}

const getLocalTabs = (): ILocalTabs => {
	const defaultReturn: ILocalTabs = {
		tabs: [{ key: 0, id: 0, type: TabType.SEARCH, search: "" }],
		value: 0,
	};
	if (!localStorage.getItem("tabs") || !localStorage.getItem("tabsValue")) {
		return defaultReturn;
	}
	const tabs: string = localStorage.getItem("tabs") as string;
	try {
		return {
			tabs: JSON.parse(tabs),
			value: Number(localStorage.getItem("tabsValue")),
		};
	} catch (error) {
		return defaultReturn;
	}
};

const setLocalTabs = (tabs: ITab[], value: number) => {
	localStorage.setItem("tabs", JSON.stringify(tabs));
	localStorage.setItem("tabsValue", value.toString());
};

function CustomTabs(props: Props) {
	const classes = useStyles();
	const localTabs = getLocalTabs();
	const [value, setValue] = React.useState<number>(localTabs.value);
	const [tabList, setTabList] = React.useState<(ISearchTab | IObjectTab)[]>(
		localTabs.tabs
	);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		setLocalTabs(tabList, newValue);
	};

	const addTab = (type: TabType) => {
		const id = tabList[tabList.length - 1].id + 1;
		const newTabList = [...tabList];
		switch (type) {
			case TabType.SEARCH:
				newTabList.push({
					key: id,
					id,
					type: TabType.SEARCH,
					search: "search",
				});
				break;

			case TabType.OBJECT:
				newTabList.push({
					key: id,
					id,
					type: TabType.OBJECT,
					name: "object",
				});
				break;

			default:
				break;
		}

		setTabList(newTabList);
		setLocalTabs(newTabList, value);
		setValue(id);
	};

	const deleteTab = (e: any) => {
		// prevent MaterialUI from switching tabs
		e.stopPropagation();

		// Cases:
		// Case 1: Single tab.
		// Case 2: Tab on which it's pressed to delete.
		// Case 3: Tab on which it's pressed but it's the first tab
		// Case 4: Rest all cases.
		// Also cleanup data pertaining to tab.

		if (tabList.length === 1) {
			return; // If you want all tabs to be deleted, then don't check for this case.
		}

		// Case 2,3,4:
		let tabID = parseInt(e.target.id);
		if (!tabID) {
			console.log("Tab delete failed");
			return;
		}
		let tabIDIndex = 0;

		const newTabList = tabList.filter((value, index) => {
			if (value.id === tabID) {
				tabIDIndex = index;
			}
			return value.id !== tabID;
		});
		let newValue = value;
		if (value === tabID) {
			// Case 3:
			if (value === 0) {
				newValue = tabList[tabIDIndex + 1].id;
			}
			// Case 2:
			else {
				if (tabList.length !== tabIDIndex + 1) {
					newValue = tabList[tabIDIndex + 1].id;
				} else {
					newValue = tabList[tabIDIndex - 1].id;
				}
			}
			setValue(newValue);
		}

		setTabList(newTabList);
		setLocalTabs(newTabList, newValue);
	};

	const StyledBadge = withStyles((theme: Theme) =>
		createStyles({
			badge: {
				backgroundColor: "transparent",
				top: -2,
			},
		})
	)(Badge);

	const StyledTab = withStyles((theme: Theme) =>
		createStyles({
			root: {
				minWidth: 50,
				backgroundColor: "rgba(223, 220, 219, 0.3)",
				borderTopLeftRadius: "10px",
				borderTopRightRadius: "10px",
				marginRight: theme.spacing(0.5),

				"&:hover": {
					backgroundColor: "rgba(223, 220, 219, 0.5)",
					color: "#40a9ff",
					opacity: 1,
				},
				"&$selected": {
					backgroundColor: "rgba(223, 220, 219, 1)",
					color: "#1890ff",
					fontWeight: theme.typography.fontWeightMedium,
				},
			},
			selected: {},
		})
	)((props: StyledTabProps) => <Tab {...props} />);

	interface StyledTabProps {
		wrapped: boolean;
		label: React.ReactNode;
		value: number;
	}

	return (
		<div className={classes.root}>
			<Button onClick={() => addTab(TabType.SEARCH)}>
				Add tab search
			</Button>
			<Button onClick={() => addTab(TabType.OBJECT)}>
				Add tab object
			</Button>

			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					{tabList.map((tab, index) => {
						if (index === 0) {
							return (
								<StyledTab
									wrapped={true}
									key={tab.key.toString()}
									value={tab.id}
									label={
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
											spacing={1}
										>
											<Grid item>
												<Search
													style={{ fontSize: 15 }}
												/>
											</Grid>
											<Grid item>Tab 0</Grid>
										</Grid>
									}
									{...a11yProps(tab.id)}
								/>
							);
						}
						return (
							<StyledTab
								wrapped={true}
								key={tab.key.toString()}
								value={tab.id}
								label={
									<StyledBadge
										invisible={
											value === tab.id ? false : true
										}
										className={classes.padding}
										color="primary"
										badgeContent={
											<Close
												color={"error"}
												id={tab.id.toString()}
												onClick={deleteTab}
												style={{ fontSize: 15 }}
											/>
										}
									>
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
											spacing={1}
										>
											{tab.type === TabType.SEARCH ? (
												<Grid item>
													<Search
														style={{
															fontSize: 15,
														}}
													/>
												</Grid>
											) : null}
											{tab.type === TabType.OBJECT ? (
												<Grid item>
													<VisibilityIcon
														style={{
															fontSize: 15,
														}}
													/>
												</Grid>
											) : null}
											<Grid item>Tab {tab.id}</Grid>
										</Grid>
									</StyledBadge>
								}
								{...a11yProps(tab.id)}
							/>
						);
					})}
				</Tabs>
			</AppBar>

			{tabList.map((tab, index) => {
				switch (tab.type) {
					case TabType.SEARCH:
						const searchTab: ISearchTab = tab as ISearchTab;
						return (
							<TabPanel value={value} index={tab.id}>
								Tab {tab.id} content !!
								<div>Search {searchTab.search}</div>
							</TabPanel>
						);

					case TabType.OBJECT:
						const objectTab: IObjectTab = tab as IObjectTab;
						return (
							<TabPanel value={value} index={tab.id}>
								Tab {tab.id} content !!
								<div>Object {objectTab.name}</div>
							</TabPanel>
						);

					default:
						break;
				}
			})}
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
	padding: {
		padding: theme.spacing(0, 2),
	},
}));

export default CustomTabs;
