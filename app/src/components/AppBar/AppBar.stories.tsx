import * as React from "react";

import { storiesOf } from "@storybook/react";
import AppBar from "./AppBar";
import CustomTabs from "../CustomTabs";
import {muiTheme} from 'storybook-addon-material-ui';

import { overridings as theme1 } from "../../../.storybook/.themes/customTheme1";
import { overridings as theme2 } from "../../../.storybook/.themes/customTheme2";
import themeF3, {
	overridings as theme3,
} from "../../../.storybook/.themes/customTheme3";
import { overridings as theme4 } from "../../../.storybook/.themes/customTheme4";
import { overridings as theme5 } from "../../../.storybook/.themes/customTheme5";

storiesOf("AppBar", module)
	.addParameters({
		backgrounds: [
			{ name: "init", value: "#FFFFFF" },
			{ name: "twitter", value: "#00aced" },
			{ name: "facebook", value: "#3b5998" },
		],
	})
    .addDecorator(muiTheme())
	.add("Simple", () => <CustomTabs />);
