import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "@antiraids/pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
    </Routes>
  );
};

export default App;
