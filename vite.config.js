import { sveltekit } from "@sveltejs/kit/vite";
import topLevelAwait from "vite-plugin-top-level-await";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
};

export default config;
