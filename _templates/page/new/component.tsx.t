---
to: src/pages/<%= h.changeCase.pascalCase(name) %>Page/index.tsx
sh: "prettier -w --parser typescript src/pages/<%= h.changeCase.pascalCase(name) %>Page/index.tsx"
---
/** @jsxImportSource @emotion/react */
import React from "react";
import * as Icons from "@mui/icons-material";
import * as UI from "@antiraids/components";
import _ from "lodash";

const <%= h.changeCase.pascalCase(name) %>Page = () => {

  return (
    <UI.Container sx={{ py: 3}}>
      <UI.Grid container>
        <UI.Typography variant="h1"><%= h.changeCase.titleCase(name) %></UI.Typography>
      </UI.Grid>
    </UI.Container>
  );
};

export default <%= h.changeCase.pascalCase(name) %>Page;
