import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // todo: add env var
  schema: "https://demo.saleor.io/graphql/",
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
