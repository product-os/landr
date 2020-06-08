import { addDecorator, addParameters, configure } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { create } from "@storybook/theming";

import "react-typist/dist/Typist.css";
import "../lib/components/global.css";

import CONTRACT from "../meta.json";

const theme = create({
  brandTitle: CONTRACT.data.name,
  brandUrl: CONTRACT.data.links.homepage,
  brandImage: CONTRACT.data.images.banner,
});

addParameters({
  options: {
    theme,
    showPanel: false,
  },
});

addDecorator(withA11y);

const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
