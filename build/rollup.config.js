import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import commonjs from "rollup-plugin-commonjs";

import { DEFAULT_EXTENSIONS } from "@babel/core";

import replace from "rollup-plugin-replace";
import { version } from "../package.json";

const path = require("path");

const resolveFile = function(filePath) {
  return path.join(__dirname, "..", filePath);
};
const env = process.env.NODE_ENV;
const basePlugins = [
  json(),
  replace({
    exclude: "node_modules/**",
    VERSION: version
  }),
  typescript({
    exclude: "node_modules/**",
    useTsconfigDeclarationDir: true
  }),
  babel({
    exclude: "node_modules/**",
    runtimeHelpers: true,
    extensions: [...DEFAULT_EXTENSIONS, ".ts"]
  }),
  commonjs()
];
const prodPlugins = [terser()];
const devPlugins = [
  livereload({
    watch: "dist"
  }),
  serve({
    // Launch in browser (default: false)
    open: true,
    openPage: "/client.html",
    // Show server address in console (default: true)
    verbose: true,
    // Folder to serve files from
    contentBase: "",
    // Multiple folders to serve from
    contentBase: ["dist", "example"],
    // Options used in setting up server
    host: "0.0.0.0",
    port: 10001
  }),
  serve({
    // Launch in browser (default: false)
    open: true,
    openPage: "/hub.html",
    // Show server address in console (default: true)
    verbose: true,
    // Folder to serve files from
    contentBase: "",
    // Multiple folders to serve from
    contentBase: ["dist", "example"],
    // Options used in setting up server
    host: "0.0.0.0",
    port: 10002
  })
];
export default {
  input: "src/crosData.ts",
  output: [
    {
      format: "iife",
      name: "crosData",
      // rollup和webpack识别的入口文件, 如果没有该字段, 那么会去读取main字段
      file: resolveFile("dist/cros-data.iife.js"),
      sourcemap: env === "development" ? true : false
    },
    {
      format: "es",
      // rollup和webpack识别的入口文件, 如果没有该字段, 那么会去读取main字段
      file: resolveFile("dist/cros-data.es.js"),
      sourcemap: env === "development" ? true : false
    },
    {
      format: "cjs",
      // rollup和webpack识别的入口文件, 如果没有该字段, 那么会去读取main字段
      file: resolveFile("dist/cros-data.cjs.js"),
      sourcemap: env === "development" ? true : false
    },
    {
      format: "umd",
      name: "crosData",
      file: resolveFile("dist/cros-data.umd.js"),
      sourcemap: env === "development" ? true : false
    }
  ],
  watch:
    env === "development"
      ? {
          exclude: "node_modules/**"
        }
      : {},
  plugins:
    env === "development"
      ? basePlugins.concat(devPlugins)
      : basePlugins.concat(prodPlugins)
};
