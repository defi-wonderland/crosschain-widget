import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    dts({
      include: ["src/package/"],
    }),
    react(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve("src", "package/index.tsx"),
      name: "CrossChainWidget",
      formats: ["es", "cjs"],
      fileName: (format) => `CrossChainWidget.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react-transition-group",
        "styled-components",
        ...Object.keys(packageJson.peerDependencies),
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
