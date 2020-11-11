import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
