import type { CodegenConfig } from "@graphql-codegen/cli";
import { API_URL } from "./constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: API_URL,
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "urql-introspection",
        "typescript-urql",
        {
          "typed-document-node": {
            documentVariablePrefix: "Untyped",
            fragmentVariablePrefix: "Untyped",
          },
        },
      ],
    },
  },
};

export default config;
