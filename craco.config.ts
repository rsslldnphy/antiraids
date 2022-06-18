import path from "path";
import merge from "lodash/merge";

module.exports = {
  webpack: {
    alias: { "@antiraids": path.resolve(__dirname, "src/") },
  },
  babel: {
    plugins:
      // babel-plugin-lodash only works when building a production
      // bundle for some reason, and breaks everything when included and
      // running `craco start`. spent ages trying to the bottom of it
      // but got nowhere so just removing it in development, where it's
      // not needed anyway as the bundle size isn't an issue
      process.env.NODE_ENV === "production" ? ["babel-plugin-lodash"] : [],
  },
  jest: {
    configure: (jestConfig: any) =>
      merge(jestConfig, {
        transform: {
          // Fixes issue with Jest tests not working correctly.
          // See:
          // - https://github.com/gsoft-inc/craco/issues/353#issuecomment-1003301013
          // - https://github.com/facebook/jest/issues/11444
          "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "./jest-babel-transform.js",
        },
      }),
  },
  devServer: {
    allowedHosts: ["localhost:3000"],
    host: "localhost",
    port: 3000,
  },
};
