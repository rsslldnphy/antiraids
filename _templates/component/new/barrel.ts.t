---
inject: true
append: true
to: src/<%= locals.page && `pages/${h.changeCase.pascalCase(locals.page)}Page/` || locals.parent && `components/${h.changeCase.pascalCase(locals.parent)}/` || '' %>components/index.ts
skip_if: "export { default as <%= h.changeCase.pascalCase(name) %> }"
---
export { default as <%= h.changeCase.pascalCase(name) %> } from "./<%= h.changeCase.pascalCase(name) %>";
export type { <%= h.changeCase.pascalCase(name) %>Props } from "./<%= h.changeCase.pascalCase(name) %>";