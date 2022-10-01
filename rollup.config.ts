import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import dts from "rollup-plugin-dts"
import del from "rollup-plugin-delete"
import pkg from "./package.json"


const extensions = [".js", ".ts"]

export default [
  {
    input: "src/plugin.ts",
    plugins: [
      resolve({ extensions, modulesOnly: true }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        presets: [
          "@babel/preset-typescript"
        ]
      }),
    ],

    external: [
      "@babel/parser",
      "@babel/traverse"
    ],

    output: [
      {
        format: "cjs",
        exports: "named",
        file: pkg.main
      }, {
        format: "esm",
        file: pkg.module
      }
    ]
  },

  // d.ts file
  {
    input: "./dist/dts/plugin.d.ts",
    output: [{ file: "dist/plugin.d.ts", format: "es" }],
    plugins: [
      dts(),
      del({
        targets: "./dist/dts",
        hook: "buildEnd"
      }),
    ]
  }
]
