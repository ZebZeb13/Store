import { configure, addParameters, addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withConsole } from '@storybook/addon-console';
import { themes } from '@storybook/theming';
// automatically import all files ending in *.stories.tsx in src/components
const req = require.context('../src/components', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'someDefault',
  },
});

// addParameters({
//   options: {
//     theme: themes.dark,
//   },
// });

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

configure(loadStories, module)