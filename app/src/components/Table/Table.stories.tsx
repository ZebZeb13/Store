import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { muiTheme } from "storybook-addon-material-ui";
import CustomTable, { Column, IRow } from "./Table";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HeaderTable from "./Header";
import { IFilters } from "./Filters";
import TableTest from "./TableTest";
import TableTestBis from "./TableTestBis";

const displayContentConst = (data: any) => {
	return (
		<Button
			onClick={() => {
				console.log(data.id);
			}}
		>
			{data.email}
		</Button>
	);
};
const displayHeaderConst = (data: any) => {
	return (
		<Button
			onClick={() => {
				console.log(data.id);
			}}
		>
			{data.label}
		</Button>
	);
};

const actionConst = (data: any) => {
	return (
		<div>
			<VisibilityIcon
				onClick={() => {
					console.log(data.id);
				}}
			></VisibilityIcon>
		</div>
	);
};

const columnsConst: Column[] = [
	{
		id: "string",
		type: "String",
		label: "String",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "int",
		type: "Int",
		label: "Int",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "filter",
		label: "Roles",
		sort: true,
		filters: {
			search: true,
			filter: {
				data: [{ label: "data1", value: "1" }],
			},
		},
	},
	{
		id: "string",
		label: "String",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "int",
		label: "Int",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "filter",
		label: "Roles",
		sort: true,
		filters: {
			search: true,
			filter: {
				data: [{ label: "data1", value: "1" }],
			},
		},
	},
	{
		id: "filter",
		label: "Roles",
		sort: true,
		filters: {
			search: true,
			filter: {
				data: [{ label: "data1", value: "1" }],
			},
		},
	},
	{
		id: "string",
		label: "String",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "int",
		label: "Int",
		sort: true,
		filters: {
			search: true,
		},
	},
	{
		id: "filters",
		label: "Roles",
		sort: true,
		filters: {
			search: true,
			filter: {
				data: [{ label: "data1", value: "1" }],
			},
		},
	},
];

const rows: IRow[] = [{ id: "1", string: "test test test test test test test test test test test test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" }, { id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" }, { id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" }, { id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" },{ id: "1", string: "test", int: "test" }];
storiesOf("Table", module)
	.addDecorator(withKnobs)
	.addDecorator(muiTheme())
	.add("Simple", () => {
		const open = boolean("open", true);
		return <CustomTable columnsBase={columnsConst} rows={rows} />;
	})
	.add("test", () => {
		return <TableTest />;
	})
	.add("test bis", () => {
		return <TableTestBis />;
	});
