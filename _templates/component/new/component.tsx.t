---
to: src/<%= locals.page && `pages/${h.changeCase.pascalCase(locals.page)}Page/` || locals.parent && `components/${h.changeCase.pascalCase(locals.parent)}/` || '' %>components/<%= h.changeCase.pascalCase(name) %>/index.tsx
sh: "prettier -w --parser typescript src/<%= locals.page && `pages/${h.changeCase.pascalCase(locals.page)}Page/` || locals.parent && `components/${h.changeCase.pascalCase(locals.parent)}/` || '' %>components/<%= h.changeCase.pascalCase(name) %>/index.tsx"
---
/** @jsxImportSource @emotion/react */
import React from "react";
import * as Icons from "@mui/icons-material";
import * as UI from "@antiraids/components";
import _ from "lodash";

export type <%= h.changeCase.pascalCase(name) %>Props = UI.BoxProps & {};

const <%= h.changeCase.pascalCase(name) %>: React.FC<<%= h.changeCase.pascalCase(name) %>Props> = ({ ...props }) => {

  return <UI.Box {...props}></UI.Box>;
};

export default <%= h.changeCase.pascalCase(name) %>;
