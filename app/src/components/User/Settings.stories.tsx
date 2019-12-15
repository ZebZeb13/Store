import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { muiTheme } from "storybook-addon-material-ui";

import SettingDialog from "./Settings";

storiesOf("User settings", module)
	.addDecorator(withKnobs)
	.addDecorator(muiTheme())
	.add("Simple", () => {
		const open = boolean("open", true);
		return <SettingDialog open={open} onClose={() => {}} />;
	});
