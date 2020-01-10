import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { muiTheme } from "storybook-addon-material-ui";

import SettingDialog from "./Settings";

import Middlwares from "../../middleware";
import UserAdmin from "../../pages/UserAdmin";

storiesOf("User settings", module)
	.addDecorator(withKnobs)
	.addDecorator(muiTheme())
	.add("Simple", () => {
		const open = boolean("open", true);
		return <SettingDialog open={open} onClose={() => {}} />;
	})
	.add("User Admin", () => {
		return (
			<Middlwares>
				<UserAdmin />
			</Middlwares>
		);
	});
