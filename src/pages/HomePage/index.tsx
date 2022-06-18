/** @jsxImportSource @emotion/react */
import React from "react";
import * as Icons from "@mui/icons-material";
import * as UI from "@antiraids/components";
import _ from "lodash";

const HomePage = () => {
  return (
    <UI.Container sx={{ py: 3 }}>
      <UI.Grid container sx={{ justifyContent: "center", mb: 3 }}>
        <UI.Grid item xs={12} md={6}>
          <UI.Typography variant="h1" sx={{ textAlign: "center" }}>
            Report an immigration raid
          </UI.Typography>
        </UI.Grid>
      </UI.Grid>
      <UI.Grid container sx={{ justifyContent: "center" }}>
        <UI.Grid item xs={12} md={6}>
          <UI.AddressSearch />
        </UI.Grid>
      </UI.Grid>
    </UI.Container>
  );
};

export default HomePage;
