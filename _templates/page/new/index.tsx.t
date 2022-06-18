---
inject: true
append: true
to: src/pages/index.ts
skip_if: "\\./<%= h.changeCase.pascalCase(name) %>Page"
sh: "prettier -w --parser typescript src/pages/index.ts"
---
export { default as <%= h.changeCase.pascalCase(name) %> } from "./<%= h.changeCase.pascalCase(name) %>Page";
