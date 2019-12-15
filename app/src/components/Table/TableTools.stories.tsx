import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { muiTheme } from "storybook-addon-material-ui";
import CustomTable, { Column, IRow } from "./Table";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SelectColumns from './SelectColumns';

storiesOf("Table tools", module)
	.addDecorator(withKnobs)
	.addDecorator(muiTheme())
	.add("Select columns", () => {
		const open = boolean("open", true);
		return <SelectColumns />;
	});
