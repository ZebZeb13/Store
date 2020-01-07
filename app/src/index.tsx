import * as React from "react";
import * as ReactDOM from "react-dom";

import "./i18n";
import App from "./App";
import Middlwares from "./middleware";

ReactDOM.render(
	<Middlwares>
		<App />
	</Middlwares>,
	document.getElementById("root")
);

// comment in for PWA with service worker in production mode
// registerServiceWorker();
