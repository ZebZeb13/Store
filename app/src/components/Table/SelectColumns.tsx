import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { ListItemIcon, Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
			position: "relative",
			overflow: "auto",
			maxHeight: 200,
		},
		listSection: {
			backgroundColor: "inherit",
		},
		ul: {
			backgroundColor: "inherit",
			padding: 0,
		},
	})
);

export default function SelectColumns() {
	const classes = useStyles();

	const groups = [
		{
			label: "Composant electronique",
			columns: [{ label: "reference" }, { label: "datasheet" }],
		},
		{
			label: "Resistance",
			columns: [
				{ label: "acurancy" },
				{ label: "resistor" },
				{ label: "resistor" },
			],
		},
	];

	return (
		<List className={classes.root} subheader={<li />}>
			{groups.map(column => (
				<li
					key={`section-${column.label}`}
					className={classes.listSection}
				>
					<ul className={classes.ul}>
						<ListSubheader>{`I'm sticky ${column.label}`}</ListSubheader>
						{column.columns.map(item => (
							<ListItem key={`item-${item.label}-${item.label}`}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										// checked={checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										// inputProps={{
										// 	"aria-labelledby": labelId,
										// }}
									/>
								</ListItemIcon>
								<ListItemText primary={`Item ${item.label}`} />
							</ListItem>
						))}
					</ul>
				</li>
			))}
		</List>
	);
}
