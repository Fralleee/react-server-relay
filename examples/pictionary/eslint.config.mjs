import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import rscRecommended from "eslint-plugin-react-server-components/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  plugins: {
    "react-server-components": rscRecommended,
    rules: {
      "react-server-components/use-client": "error",
    },
  },
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
