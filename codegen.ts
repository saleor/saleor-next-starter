import type { CodegenConfig } from "@graphql-codegen/cli";
import { API_URL } from "./constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: API_URL,
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/": {
      preset: 'client',
    },
  },
};

export default config;
