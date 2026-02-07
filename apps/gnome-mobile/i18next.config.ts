import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en", "de", "kr", "pl", "ua"],
  lint: {
    acceptedTags: ["Text"],
  },
  extract: {
    primaryLanguage: "pl",
    defaultValue: () => null,
    removeUnusedKeys: false,
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public\\locales\\{{language}}\\{{namespace}}.json",
  },
});
