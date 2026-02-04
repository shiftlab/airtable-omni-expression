import typescript from "rollup-plugin-typescript2";
import svg from "rollup-plugin-svg-import";

export default {
  input: "src/index.tsx",
  plugins: [
    svg({ stringify: true }),
    typescript({ tsconfig: "tsconfig.app.json" }),
  ],
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
};
