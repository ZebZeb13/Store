import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import CustomTabs from "../components/CustomTabs";
interface Props extends RouteComponentProps<void> {}

function HomePage(props: Props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			Devistore
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

export default HomePage;
