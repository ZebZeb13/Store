import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
	onView?: (id: number) => void;
	onDelete?: (id: number) => void;
	for: string[];
}

export default function ActionTypeProvider({
	onView,
	onDelete,
	for: forColumns,
}: IProps) {
	const ActionFormater = ({ value }: any) => {
		return (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				wrap="nowrap"
			>
				{onView ? (
					<Grid item>
						<IconButton
							aria-label="View"
							onClick={() => {
								onView(value);
							}}
							size="small"
						>
							<VisibilityIcon fontSize="small" color="primary" />
						</IconButton>
					</Grid>
				) : null}
				{onDelete ? (
					<Grid item>
						<IconButton
							aria-label="delete"
							onClick={() => {
								onDelete(value);
							}}
							size="small"
						>
							<DeleteIcon fontSize="small" color="secondary" />
						</IconButton>
					</Grid>
				) : null}
			</Grid>
		);
	};
	return (
		<DataTypeProvider
			formatterComponent={ActionFormater}
			for={forColumns}
		/>
	);
}
