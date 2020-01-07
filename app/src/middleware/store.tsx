import * as React from "react";
import { HashRouter, Router } from "react-router-dom";
import { history } from "../configureStore";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Typography } from "@material-ui/core";
const { persistor, store } = configureStore();

export default function({ children }: { children: React.ReactChild }) {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<Typography>Loading...</Typography>}
				persistor={persistor}
			>
			{children}

			</PersistGate>
		</Provider>
	);
}
