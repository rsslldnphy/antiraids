---
to: src/<%= locals.page && `pages/${h.changeCase.pascalCase(locals.page)}Page/` || locals.parent && `components/${h.changeCase.pascalCase(locals.parent)}/` || '' %>components/index.ts
unless_exists: true
---
