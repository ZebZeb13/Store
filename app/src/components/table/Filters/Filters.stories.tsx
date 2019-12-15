import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { muiTheme } from "storybook-addon-material-ui";
import CustomTable, { Column, IRow } from "./Table";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Sort from "./Sort";
import Search from "./Search";
import Filter from "./Filter";
import DateTime from "./DateTime";
import Range from "./Range";

storiesOf("Table filters", module)
	.addDecorator(withKnobs)
	.addDecorator(muiTheme())
	.add("Sort", () => {
		const open = boolean("open", true);
		return <Sort />;
	})
	.add("Search", () => {
		const open = boolean("open", true);
		return <Search />;
	})
	.add("Filter", () => {
		const open = boolean("open", true);
		return <Filter />;
	})
	.add("Date", () => {
		const open = boolean("open", true);
		return <DateTime />;
	})
	.add("Range", () => {
		const open = boolean("open", true);
		return <Range />;
	});
