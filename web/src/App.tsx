import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./theme/main.scss";

import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Login from "./Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
